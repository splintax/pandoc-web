// Generated by CoffeeScript 1.6.3
(function() {
  angular.module('pandoc.controllers', ['ui.codemirror', 'LocalStorageModule', 'ngSanitize']).controller('markdown-compiler', [
    '$scope', '$element', 'localStorageService', '$sanitize', function(scope, elem, storage, $sanitize) {
      scope.render = function() {
        return scope.html = scope.converter.makeHtml(scope.doc.code);
      };
      scope.cmOptions = {
        mode: 'markdown',
        theme: 'solarized',
        onChange: scope.render
      };
      scope.documents = storage.get('documents');
      if (scope.documents == null) {
        console.log('no documents found');
        scope.documents = [
          {
            name: 'example',
            code: '# Markdown view'
          }
        ];
        storage.add('documents', scope.documents);
      } else {
        console.log(scope.documents.length + ' documents found.');
      }
      scope.doc = scope.documents[0];
      console.log('current doc', scope.doc);
      scope.converter = new Showdown.converter();
      scope.render();
      scope.save = function() {
        scope.doc.lastSaved = new Date();
        return storage.add('documents', scope.documents);
      };
      return scope["new"] = function() {
        return scope.documents.push({
          name: scope.newDoc,
          code: "Add content to your new document..."
        });
      };
    }
  ]);

}).call(this);