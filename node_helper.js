'use strict';

/* Magic Mirror
 * Module: Volumio
 *
 * By Anthony Graglia
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
var io = require('socket.io-client');

module.exports = NodeHelper.create({
    start: function () {
        console.log('--- ' + this.name + ': Node Helper Start');
    },
    socketNotificationReceived: function (notification, config) {
        if (notification === 'MMM-VOLUMIO-SET-CONFIG') {
            console.log('--- ' + this.name + ': Socket Notification Received: ' + notification);
            var self = this;
            this.setupSocket.call(self, config);
        }
    },
    setupSocket: function (config) {
        var self = this;

        self.socket = io.connect(config.volumioUrl);

        // Successful connection
        self.socket.on('connect', function () {
            self.sendSocketNotification('MMM-VOLUMIO-CLIENT-CONNECTED', true);
        });

        // Disconnection
        self.socket.on('disconnect', function () {
            self.sendSocketNotification('MMM-VOLUMIO-CLIENT-CONNECTED', false);
        });

        // Player state changes
        self.socket.on('pushState', function (data) {
            self.sendSocketNotification('MMM-VOLUMIO-DATA', data);
        });
    }
});
