'use strict';

/* Magic Mirror
 * Module: Volumio
 *
 * By Anthony Graglia
 * MIT Licensed.
 */

Module.register('MMM-Volumio', {
    defaults: {
        connectInterval: 20000,
        domUpdateInterval: 20000,
        volumioUrl: '' //'http://127.0.0.1'
    },
    start: function () {
        Log.info('--- ' + this.name + ': Starting module');

        var self = this;
        this.connected = false;
        this.volumioData = null;

        setInterval(function () {
            self.updateDom();
        }, this.config.domUpdateInterval);

        setInterval(function () {
            if (!self.connected) {
                self.sendSocketNotification('MMM-VOLUMIO-SET-CONFIG', self.config);
            }
        }, this.config.connectInterval);
    },
    socketNotificationReceived: function (notification, payload) {
        Log.info('--- ' + this.name + ': ' + payload);

        var self = this;

        switch (notification) {
            case 'MMM-VOLUMIO-CLIENT-CONNECTED':
                self.connected = payload;
                self.updateDom();
                break;
            case 'MMM-VOLUMIO-DATA':
                self.volumioData = payload;
                self.updateDom();
                break;
            default:
                break;
        }
    },
    getStyles: function () {
        return ['MMM-Volumio.css', 'font-awesome.css'];
    },
    getDom: function () {
        var wrapper = document.createElement('div');

        if (this.config.volumioUrl === '') {
            wrapper.innerHTML = 'Please set the IP or URL to Volumio.';
            wrapper.className = 'dimmed light small';
            return wrapper;
        }

        if (!this.connected) {
            wrapper.innerHTML = 'Connecting to Volumio...';
            wrapper.className = 'dimmed light small';
            return wrapper;
        }

        if (this.volumioData === null) {
            wrapper.innerHTML = 'No data yet...';
            wrapper.className = 'dimmed light small';
            return wrapper;
        }

        var data = this.volumioData;

        var item = document.createElement('div');
        item.className = 'mmm-volumio-item';
        item.innerHTML = '<div>' + data['album'] + '</div>'
            + '<div>' + data['artist'] + '</div>'
            + '<div>' + data['title'] + '</div>'
            + '<div>' + data['trackType'] + '</div>';
        wrapper.appendChild(item);

        return wrapper;
    }
});
