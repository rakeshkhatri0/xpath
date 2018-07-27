<?php

namespace App\Http\Controllers;

use App\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // default page size
        $perPage = 5;
        if (isset($request->per_page) && is_numeric($request->per_page)) {
            // page size from API
            $perPage = $request->per_page;
        }

        // match if first_name exists
        $where = [];
        if (isset($request->first_name) && strlen($request->first_name) > 0) {
            $where = [
                ['first_name', 'like', '%' . $request->first_name . '%']
            ];
        }

        // get members and paginate
        $member = Member::where($where)
            ->paginate($perPage);
        return response()->json($member);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:member',
            'password' => 'required'
        ]);
        if ($validator->fails()) {
            $errors = $validator->errors();
            return response()->json(['status' => false, 'errors' => $errors]);
        } else {
            $member = new Member;
            $member->first_name = $request->first_name;
            $member->last_name = $request->last_name;
            $member->email = $request->email;
            $member->password = password_hash($request->password, PASSWORD_DEFAULT);
            $member->reset_token = $request->reset_token;
            $member->media = $request->media;
            if ($member->save()) {
                $response = ['status' => 'true', 'msg' => 'member created successfully'];
            } else {
                $response = ['status' => false, 'msg' => 'Failed to create member.'];
            }
            return response()->json($response);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Member $member
     * @return \Illuminate\Http\Response
     */
    public function show(Member $member, $memberId)
    {
        $member = Member::find($memberId);
        if (isset($member->id)) {
            return response()->json($member);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Member $member
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Member $member, $memberId)
    {
        $member = Member::find($memberId);
        if (isset($member->id)) {
            $member->first_name = $request->first_name;
            $member->last_name = $request->last_name;
            $member->media = $request->media;
            if ($member->save()) {
                $response = ['status' => true, 'msg' => 'member updated successfully'];
            } else {
                $response = ['status' => false, 'msg' => 'member not updated'];
            }
            return response()->json($response);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Member $member
     * @return \Illuminate\Http\Response
     */
    public function destroy(Member $member, $memberId)
    {
        $member = Member::find($memberId);
        if (isset($member->id) && $member->delete()) {
            $response = ['status' => true, 'msg' => 'Member deleted successfully'];
        } else {
            $response = ['status' => false, 'msg' => 'unable to delete'];
        }
        return response()->json($response);
    }

    /**
     * --------------------------------------------------
     * check if member is already logged.
     * --------------------------------------------------
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * --------------------------------------------------
     */
    public function checkLogin(Request $request)
    {
        if ($request->session()->get('is_logged')) {
            $member = Member::find($request->session()->get('member_id'));
            $response = ['status' => true, 'member' => $member, 'msg' => 'Already logged.'];
        } else {
            $response = ['status' => false, 'msg' => 'Not login yet.'];
        }
        return response()->json($response);
    }

    /**
     * --------------------------------------------------
     * verify the member credentials with database records
     * and login on successful.
     * --------------------------------------------------
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * --------------------------------------------------
     */
    public function login(Request $request)
    {
        // validation
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // response failure
        if ($validator->fails()) {
            $errors = $validator->errors();
            $response = ['status' => false, 'errors' => $errors];
        } else {
            $password = password_hash($request->password, PASSWORD_DEFAULT);
            // Check validation
            $member = Member::where([
                ['email', $request->email],
                ['password', $password]
            ])->get()->first();
            if (isset($member->id)) {
                // save info in session
                $request->session()->put('is_logged', true);
                $request->session()->put('member_id', $member->id);
                $request->session()->put('is_admin', $member->is_admin);

                $response = ['status' => true, 'member' => $member, 'msg' => 'Login is successful.'];
            } else {
                $response = ['status' => false, 'msg' => 'Login is failed.'];
            }
        }
        return response()->json($response);
    }

    /**
     * --------------------------------------------------
     * delete the member session.
     * --------------------------------------------------
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * --------------------------------------------------
     */
    public function logout(Request $request)
    {
        $response = ['status' => false, 'msg' => 'Invalid Request.'];
        // destroy if session exists
        $sessionId = $request->session()->getId();
        if ($sessionId) {
            $request->session()->flush();
            $response = ['status' => true, 'msg' => 'Logout is successful.'];
        }
        return response()->json($response);
    }

    public function changePassword(Request $request)
    {
        // default response
        $response = [
            'status' => false,
            'msg' => 'Invalid request.'
        ];

        //validating admin data
        $validator = Validator::make($request->all(), [
            'old_password' => 'required',
            'new_password' => 'required'
        ]);
        //validation fails
        if ($validator->fails()) {
            $errors = $validator->errors();
            $response = ['status' => false, 'errors' => $errors];
        } else {
            $old_password = password_hash($request->old_password, PASSWORD_DEFAULT);
            $member = Member::where([
                ['password', $old_password]
            ])->get()->first();
            if (isset($member->id)) {
                $update = [
                    'password' => password_hash($request->new_password, PASSWORD_DEFAULT)
                ];
                if ($member->update($update)) {
                    $response = ['status' => true, 'msg' => 'Password changed successfully.'];
                } else {
                    $response = ['status' => false, 'msg' => 'Failed to change password.'];
                }
            } else {
                $response = ['status' => false, 'msg' => 'Invalid old password supplied.'];
            }
        }
        return response()->json($response);
    }


}
