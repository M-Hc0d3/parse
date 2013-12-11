
setTimeout(function(){$('body').ready(function (){$('#loader').fadeOut(500);});},2000);

		setTimeout(function(){$('body').ready(function (){$('#login').fadeIn('slow');});},3000);

		function login () {
			
			setTimeout(function(){$('body').ready(function (){$('#login').fadeOut(500);});},1000);

			/*$('body').ready(function (){
				$('#big').fadeIn('slow');
			});*/

			setTimeout(function(){$('body').ready(function (){$('#big').fadeIn('slow');});},2000);
		}
		
		
		YUI().use('node', function(Y) {
			
			var ListItem, 
			query,
			noTasksMessage = Y.one('#no-incomplete-message'),
			submitBtn = Y.one("#list-item-submit"),
			incompleteItemList = Y.one('#incomplete-items'),
			completeItemList = Y.one('#complete-items'),
			input = Y.one("#list-input");
			
			
			Parse.initialize("6MQR8G7nxeInwGvZ0Q8wg33SFJEb53pDx8uD2Xvc", "N5tGk2hvHE3ScR4IsqUt9COpPPbgRc1r9E0b8c4h");
			
			//Handle Click Event
			submitBtn.on('click', function(e) {
				
				//Save the current Todo
				var text = Y.one('#list-input').get('value');
				var ListItem = Parse.Object.extend("ListItem");
				var listItem = new ListItem();

				listItem.set("content", text);
				listItem.set("isComplete", false);
				
				//Once it is saved, show it in the list of todo's.
				listItem.save(null, {
				  success: function(item) {
						noTasksMessage.addClass('hidden');
				    var content = Y.Lang.sub(Y.one('#todo-items-template').getHTML(), {
							content: item.get('content'),
							id: item.id,
							isComplete: item.get('isComplete')
						});
						incompleteItemList.append(content);
						input.set('value', '').focus();
				  },
				  error: function(gameScore, error) {
						alert("Error when saving Todos: " + error.code + " " + error.message);
				  }
				});
			});
			
			
			
			//Get 10 most recent incomplete Todos.
			ListItem = Parse.Object.extend("ListItem");
			query = new Parse.Query(ListItem);
			query.equalTo('isComplete', false)
			query.limit = 10;
			query.descending('createdAt');
			query.find({
			  success: function(results) {
					if (results.length > 0) {
						noTasksMessage.addClass('hidden');
					}
					//Append each of the incomplete tasks to the Incomplete List
					Y.Array.each(results, function(val, i, arr) {
						var content = Y.Lang.sub(Y.one('#todo-items-template').getHTML(), {
							content: val.get('content'),
							id: val.id,
							isComplete: false
						});
						incompleteItemList.append(content);
					});
					
					//When the checkbox is clicked for any of the items in the incomplete list, update it as complete.
					incompleteItemList.delegate('click', function (e) {
						var self = this;
						query = new Parse.Query(ListItem);
						query.get(self.one('input').get('id'), {
						  success: function(item) {
						    item.set('isComplete', true);
								item.save();
								self.remove();

								if (incompleteItemList.all('li').size() >= 1) {
									noTasksMessage.removeClass('hidden');
								}
								
						  },
						  error: function(object, error) {
								alert("Error when updating todo item: " + error.code + " " + error.message);
						  }
						});
					}, 'li');
			  },
			  error: function(error) {
			    alert("Error when retrieving Todos: " + error.code + " " + error.message);
			  }
			});
			
		});