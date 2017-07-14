/**
 * @author Santhosh Vasabhaktula <santhosh@ilimi.in>
 */

org.ekstep.contenteditor.init = function(context, config, $scope, $document, callback) {
    org.ekstep.contenteditor._mergeConfig(config);
    org.ekstep.contenteditor._initServices();
    org.ekstep.contenteditor.globalContext = context;    
    org.ekstep.contenteditor._loadDefaultPlugins(context, callback);
    //org.ekstep.contenteditor._backwardCompatibility();
}

org.ekstep.contenteditor._backwardCompatibility = function() {
    /* Deprecated variables */
    EkstepEditorAPI.apislug = org.ekstep.contenteditor.config.apislug;
    EkstepEditorAPI.baseURL = org.ekstep.contenteditor.config.baseURL;
    EkstepEditorAPI.absURL = org.ekstep.contenteditor.config.absURL;
    EkstepEditorAPI.globalContext = org.ekstep.contenteditor.globalContext;
}

org.ekstep.contenteditor._initServices = function() {
    org.ekstep.services.config = {
        baseURL: org.ekstep.contenteditor.config.baseURL,
        apislug: org.ekstep.contenteditor.config.apislug
    }
    org.ekstep.pluginframework.initialize({ 
        env: 'editor',
        jQuery: org.ekstep.contenteditor.jQuery, 
        pluginRepo: org.ekstep.contenteditor.config.pluginRepo,
        build_number: org.ekstep.contenteditor.config.build_number        
    });
}

org.ekstep.contenteditor._mergeConfig = function(config) {
    config = config || {};
    org.ekstep.contenteditor.config = _.assign(org.ekstep.contenteditor.config, config);
}

org.ekstep.contenteditor._loadDefaultPlugins = function(context, callback) {
    if(org.ekstep.contenteditor.config.corePluginsPackaged === true) org.ekstep.contenteditor.jQuery("body").append($("<script type='text/javascript' src='scripts/coreplugins.js?" + org.ekstep.contenteditor.config.build_number + "'>"));
    org.ekstep.pluginframework.eventManager.enableEvents = false;
    org.ekstep.pluginframework.pluginManager.loadAllPlugins(org.ekstep.contenteditor.config.plugins, undefined, function () {        
        org.ekstep.pluginframework.eventManager.enableEvents = true;
        callback();
    });
}