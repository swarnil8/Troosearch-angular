var ui = new UI();
var api = new Api(ui);
var events= new Events(ui,api);
events.capture();
