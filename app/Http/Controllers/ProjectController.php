<?php

namespace App\Http\Controllers;

use App\Keyword;
use App\Project;
use App\Url;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    /**
     * -------------------------------------------------
     * search the project using keyword and paginate.
     * -------------------------------------------------
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * -------------------------------------------------
     */
    public function index(Request $request)
    {
        // extract from session
        $isAdmin = $request->session()->get('is_admin');
        $memberId = $request->session()->get('member_id');

        // default page size
        $perPage = 5;
        if (isset($request->per_page) && is_numeric($request->per_page)) {
            // page size from API
            $perPage = $request->per_page;
        }
        // init the condition
        $where = [];
        // limit for admin and developers
        if ($isAdmin) {
            $where[] = ['owner_id', $memberId];
        } else {
            $where[] = ['assign_id', $memberId];
        }
        // match if keyword exists
        if (isset($request->keyword) && strlen($request->keyword) > 0) {
            $where[] = ['project_name', 'like', '%' . $request->keyword . '%'];
        }
        // get projects and paginate
        $projects = Project::where($where)
            ->paginate($perPage);
        return response()->json($projects);
    }


    /**
     * -------------------------------------------------
     * create project and save the keywords.
     * -------------------------------------------------
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * -------------------------------------------------
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'project_name' => 'required',
            'keywords' => 'required',
            'version' => 'required'
        ]);
        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json(['status' => false, 'errors' => $errors]);
        } else {
            // save project
            $project = new Project;
            $project->project_name = $request->project_name;
            $project->version = $request->version;
            $project->owner_id = $request->session()->get('member_id');
            if ($request->has('description')) {
                $project->description = trim($request->description);
            }
            $project->save();

            // extract keywords
            $keywords = $this->extractKeywords($request->keywords, $project->id);
            // bulk insert
            $keyword = new Keyword;
            if ($keyword->insert($keywords)) {
                $response = ['status' => true, 'msg' => 'Project is created successfully.'];
            } else {
                $response = ['status' => false, 'msg' => 'Failed to create project.'];
            }
            return response()->json($response);
        }
    }

    public function assign(Request $request)
    {
        $project = Project::where('id', $request->project_id);
        $project->assign_id = $request->member_id;
        $project->save();
        return response()->json($project);
    }

    /**
     * -------------------------------------------------
     * store the urls related to project and keyword.
     * -------------------------------------------------
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * -------------------------------------------------
     */
    public function storeUrl(Request $request)
    {
        $projectId = $request->project_id;
        $keywordId = $request->keyword_id;
        $urls = json_decode($request->urls);
        $records = [];
        if (!empty($urls)) {
            foreach ($urls as $itemUrl) {
                $domain = preg_replace('/(?:^w{3}\.)/i', '', parse_url($itemUrl, PHP_URL_HOST));
                $url = Url::where('domain_name', $domain)->get()->first();
                if (!isset($url->id)) {
                    $records[] = [
                        'project_id' => $projectId,
                        'keyword_id' => $keywordId,
                        'domain_name' => $domain,
                        'url' => trim($itemUrl),
                        'created_at' => Carbon::now(),
                        'updated_at' => Carbon::now()
                    ];
                }
            }
        }
        // bulk insert
        if (Url::insert($records)) {
            $response = ['status' => true, 'msg' => 'Urls saved successfully.'];
        } else {
            $response = ['status' => false, 'msg' => 'Failed to save Urls.'];
        }
        return response()->json($response);
    }

    /**
     * -------------------------------------------------
     * display the specified resource.
     * -------------------------------------------------
     * @param  \Illuminate\Http\Request $request
     * @param int $projectId
     * @return \Illuminate\Http\Response
     * -------------------------------------------------
     */
    public function show(Request $request, $projectId)
    {
        $project = Project::find($projectId);
        if (isset($project->id)) {
            $keywords = Keyword::where('project_id', $project->id)->get();
            $response = ['status' => true, 'project' => $project, 'keywords' => $keywords];
        } else {
            $response = ['status' => false, 'msg' => 'No such project exists.'];
        }
        return response()->json($response);
    }

    /**
     * -------------------------------------------------
     * get aggregate count for project, keyword and url.
     * -------------------------------------------------
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     * -------------------------------------------------
     */
    public function showAggregate(Request $request)
    {
        // todo // create database view to generate aggregate results
        return response()->json([
            'status' => true,
            'project_count' => Project::all()->count(),
            'keyword_count' => Keyword::all()->count(),
            'url_count' => Url::all()->count(),
        ]);
    }

    /**
     * -------------------------------------------------
     *  update the specified project in storage.
     * -------------------------------------------------
     * @param  \Illuminate\Http\Request $request
     * @param  int $projectId
     * @return \Illuminate\Http\Response
     * -------------------------------------------------
     */
    public function update(Request $request, $projectId)
    {
        $project = Project::find($projectId);
        if (isset($project->id)) {
            $project->project_name = $request->project_name;
            // conditional version update
            if ($request->has('version')) {
                $project->version = $request->version;
            }
            // conditional description update
            if ($request->has('description')) {
                $project->description = trim($request->description);
            }
            $project->save();

            // delete existing keywords
            Keyword::where('project_id', $project->id)->delete();

            // extract keywords
            $keywords = $this->extractKeywords($request->keywords, $project->id);
            // bulk insert
            if (Keyword::insert($keywords)) {
                $response = ['status' => true, 'msg' => 'Project is created successfully.'];
            } else {
                $response = ['status' => false, 'msg' => 'Failed to create project.'];
            }
        } else {
            $response = ['status' => false, 'msg' => 'No such project exists.'];
        }
        return response()->json($response);
    }

    /**
     * -------------------------------------------------
     * update project progress status. only for devs.
     * -------------------------------------------------
     * @param Request $request
     * @param int $projectId
     * @return \Illuminate\Http\JsonResponse
     * -------------------------------------------------
     */
    public function updateStatus(Request $request, $projectId)
    {
        $project = Project::find($projectId);
        if (isset($project->id)) {
            $project->status = $request->status;
            $project->save();
            $response = ['status' => true, 'msg' => 'Project status updated successfully.'];
        } else {
            $response = ['status' => false, 'msg' => 'No such project exists.'];
        }
        return response()->json($response);
    }

    /**
     * -------------------------------------------------
     * remove the specified project from storage.
     * -------------------------------------------------
     * @param  Request $request
     * @param int $projectId
     * @return \Illuminate\Http\Response
     * -------------------------------------------------
     */
    public function destroy(Request $request, $projectId)
    {
        $project = Project::find($projectId);
        if (isset($project->id) && $project->delete()) {
            $response = ['status' => true, 'msg' => 'Deleted successfully.'];
        } else {
            $response = ['status' => false, 'msg' => 'Deletion failed.'];
        }
        return response()->json($response);
    }

    /**
     * -------------------------------------------------
     * insert the project urls to csv file and download.
     * -------------------------------------------------
     * @param Request $request
     * @param int $projectId
     * @return \Illuminate\Http\Response
     * -------------------------------------------------
     */
    public function export(Request $request, $projectId)
    {
        $fields = ['Domain', 'Url'];
        $project = Project::find($projectId);
        if (isset($project->id)) {
            $rows = Url::where('project_id', $project->id)
                ->select('domain_name', 'url')
                ->get()->toArray();
            if (!empty($rows)) {
                // check download directory
                $downloadDir = base_path() . '/logs/csv/';
                if (!is_dir($downloadDir)) {
                    mkdir($downloadDir, 0775, true);
                }
                $filename = $this->exportName($project->project_name);
                $filePath = $downloadDir . $filename;
                $fp = fopen($filePath, 'w');
                fputcsv($fp, $fields);
                foreach ($rows as $row) {
                    fputcsv($fp, $row);
                }
                fclose($fp);
                // set appropriate headers
                header('Content-Description: File Transfer');
                header('Content-Type: application/csv');
                header('Content-Disposition: attachment; filename=' . $filename);
                header('Expires: 0');
                header('Cache-Control: must-re validate ');
                header('Pragma: public');
                header('Content-Length: ' . filesize($filePath));
                ob_clean();
                flush();
                //read the file from the disk
                readfile($filePath);
                // response
                $response = ['status' => true, 'msg' => 'Downloaded successfully.'];
            } else {
                $response = ['status' => false, 'msg' => 'No Urls found.'];
            }
        } else {
            $response = ['status' => false, 'msg' => 'No such project exists.'];
        }
        return response()->json($response);
    }

    /**
     * -------------------------------------------------
     * extract the list of keywords from string and
     * convert to array.
     * -------------------------------------------------
     * @param string $list
     * @param int $projectId
     * @return array
     * -------------------------------------------------
     */
    private function extractKeywords($list, $projectId, $isUpdate = false)
    {
        // extract keywords
        $keywords = array_map('trim', preg_split('/\,|\;/is', $list));
        // prepare for bulk insert
        $records = [];
        foreach ($keywords as $item) {
            if (strlen($item) > 0) {
                // timestamps
                if (!$isUpdate) {
                    $timestamps = [
                        'created_at' => Carbon::now(),
                        'updated_at' => Carbon::now()
                    ];
                } else {
                    $timestamps = [
                        'updated_at' => Carbon::now()
                    ];
                }
                $records[] = array_merge([
                    'project_id' => $projectId,
                    'keyword' => $item
                ], $timestamps);
            }
        }
        return $records;
    }

    /**
     * -------------------------------------------------
     * generate the export file name from project name.
     * -------------------------------------------------
     * @param string $projectName
     * @return string
     * -------------------------------------------------
     */
    private function exportName($projectName)
    {
        return strtolower(trim(preg_replace('/\W+/i', '-', $projectName))) . '.csv';
    }
}
