// import jquery slim
import jQuery from 'jquery/dist/jquery.slim';

function submitCallback(result, websites) {
    let params = {
        project_id: result.project.id,
        keyword_id: result.keyword_id,
        urls: JSON.stringify(websites)
    };
    chrome.runtime.sendMessage({
        action: 'add',
        data: params
    });
}

(function ($) {
    $(document).ready(function () {
        let records = $('#search').find('h3.r>a');
        let websites = [];

        //loop the required search data
        $.each(records, function (index, record) {
            let url = new URL($(record).attr('href'));
            websites.push(url.protocol + '//' + url.host);
        });

        chrome.storage.sync.get(['project', 'keyword_id'], function (result) {
            submitCallback(result, websites);
        });
    });
})(jQuery);