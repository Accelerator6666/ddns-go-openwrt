'use strict';
'require view';
'require form';
'require uci';
'require rpc';

var callServiceList = rpc.declare({
	object: 'service',
	method: 'list',
	params: [ 'name' ],
	expect: { '': {} }
});

return view.extend({
	load: function() {
		return Promise.all([
			uci.load('ddns-go'),
			callServiceList('ddns-go')
		]);
	},

	render: function(data) {
		var service = data[1] && data[1]['ddns-go'];
		var running = false;

		if (service && service.instances) {
			running = Object.keys(service.instances).some(function(k) {
				return service.instances[k] && service.instances[k].running;
			});
		}

		var m = new form.Map(
			'ddns-go',
			_('DDNS-GO'),
			_('Configure the DDNS-GO service. Provider credentials and domain records are configured in the DDNS-GO web interface.')
		);

		var s = m.section(form.NamedSection, 'main', 'ddns-go', _('Service'));
		s.addremove = false;

		var o;

		o = s.option(form.DummyValue, '_status', _('Status'));
		o.rawhtml = true;
		o.cfgvalue = function() {
			return running
				? '<span style="color:green;font-weight:bold">' + _('Running') + '</span>'
				: '<span style="color:red;font-weight:bold">' + _('Stopped') + '</span>';
		};

		o = s.option(form.Flag, 'enabled', _('Enable'));
		o.default = o.enabled;
		o.rmempty = false;

		o = s.option(form.Value, 'listen', _('Listen address'));
		o.default = ':9876';
		o.placeholder = ':9876';
		o.rmempty = false;
		o.description = _('Example: :9876 or 0.0.0.0:9876');

		o = s.option(form.Value, 'interval', _('Update interval'));
		o.default = '300';
		o.datatype = 'uinteger';
		o.rmempty = false;
		o.description = _('Seconds between DDNS checks.');

		o = s.option(form.Value, 'cache_times', _('IP cache times'));
		o.default = '5';
		o.datatype = 'uinteger';
		o.rmempty = false;

		o = s.option(form.Value, 'dns', _('Custom DNS server'));
		o.placeholder = '8.8.8.8';
		o.rmempty = true;

		o = s.option(form.Flag, 'skip_verify', _('Skip TLS certificate verification'));
		o.default = o.disabled;

		o = s.option(form.Flag, 'no_web', _('Disable DDNS-GO web interface'));
		o.default = o.disabled;

		o = s.option(form.DummyValue, '_web', _('DDNS-GO web interface'));
		o.rawhtml = true;
		o.cfgvalue = function() {
			var listen = uci.get('ddns-go', 'main', 'listen') || ':9876';
			var portMatch = listen.match(/:(\d+)$/);
			var port = portMatch ? portMatch[1] : '9876';
			var host = window.location.hostname;

			if (host.indexOf(':') >= 0 && host.charAt(0) !== '[')
				host = '[' + host + ']';

			var url = window.location.protocol + '//' + host + ':' + port + '/';

			return '<a class="btn cbi-button cbi-button-action" target="_blank" rel="noreferrer noopener" href="' +
				url + '">' + _('Open web interface') + '</a>';
		};

		return m.render();
	}
});
