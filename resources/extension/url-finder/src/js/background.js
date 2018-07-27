import axios from "axios";

// include default axios conf
import '../common/axios.conf';

let store = {
    tabId: null,
    project: null,
    keywords: [],
    searchEngine: 'Google'
};

// event listener
chrome.runtime.onMessage.addListener((request) => {
    if (request.action === 'search') { // from popup

        // set search engine
        store.searchEngine = request.searchEngine;

        axios.get('project/show/' + request.projectId).then(response => {
            chrome.storage.sync.set({
                project: response.data.project,
                keywords: response.data.keywords
            });
            store.project = response.data.project;
            store.keywords = response.data.keywords;
            openTab(0, 0);
        });
    } else if (request.action === 'add') { // from content
        axios.post('project/createUrl', request.data).then(response => {
        });
    }
});

function getSearchUrl(counter, reset) {
    if (store.searchEngine === 'Google') {
        return 'https://www.google.com/search?q=' + store.keywords[counter].keyword + '&start=' + (reset * 10);
    } else if (store.searchEngine === 'Yahoo') {
        return 'https://search.yahoo.com/search?p=' + store.keywords[counter].keyword + '&b=' + ((reset * 10) + 1) + '&pz=10&start=' + ((reset * 3) + 1);
    } else if (store.searchEngine === 'Bing') {
        return 'https://bing.com/search?q=' + store.keywords[counter].keyword + '&first=' + (reset * 10) + '&FORM=PERE' + reset;
    } else if (store.searchEngine === 'Duckduck') {
        return 'https://duckduckgo.com/search?q=' + store.keywords[counter].keyword;
    }
}

// open or update tab
function openTab(counter, reset) {
    // get search url // or default
    let searchUrl = getSearchUrl(counter, reset);
    // set tab properties
    // store.searchUrl + store.keywords[counter].keyword + '&start=' + (reset * 10)
    let properties = {
        url: searchUrl,
        active: true,
        selected: true
    };

    // store current keyword
    chrome.storage.sync.set({
        keyword_id: store.keywords[counter].id
    });

    if (store.tabId === null) {
        // launch on first time
        chrome.tabs.create(properties, (tab) => {
            store.tabId = tab.id;
        });
    } else {
        //update the existing tab
        chrome.tabs.update(store.tabId, properties);
    }

    // recursive call each 10 seconds
    let interval = null;
    if (counter <= store.keywords.length) {
        interval = setInterval(function () {
            // increase counter if reset equals zero.
            if (reset === 0) {
                reset = reset + 1;
            } else if (reset === 1) {
                counter = counter + 1;
                reset = 0;
            }
            openTab(counter, reset);
        }, 10000);
    } else {
        if (interval !== null) {
            clearInterval(interval);
        }
    }
}
