'use strict';

import SpeechToTextController from './../controller/speechToTextController';
import LocalTunnelController from './../controller/localTunnelController';

class SocketManagerService {
    constructor() {}

    /**
     * Initialize socket setup.
     *
     * @param {Socket} socket
     */
    init(socket) {
        this._setupSocketsSTT(socket);
        this._setupSocketsLocalTunnel(socket);
    }

    /***************************************************************************************************/
    /*                                       Speech to text                                            */
    /***************************************************************************************************/

    /**
     * Create speech to text listener and connect them to the appropriate controller action.
     *
     * @param {SocketIOClient.Socket} socket
     * @private
     */
    _setupSocketsSTT(socket) {
        const speechToTextController = new SpeechToTextController(socket);
        socket.on('post-stt-registerCallback', (data) => speechToTextController.registerCallback(data));
        socket.on('post-stt-createRecognitionJob', () => speechToTextController.createRecognitionJob());
        socket.on('get-stt-getRecognitionJobs', () => speechToTextController.getRecognitionJobs());
        socket.on('get-stt-getRecognitionJob', () => speechToTextController.getRecognitionJob());
        socket.on('get-stt-config', () => speechToTextController.getConfiguration());
        socket.on('delete-stt-deleteRecognitionJob', () => speechToTextController.deleteRecognitionJob());
    }

    /***************************************************************************************************/
    /*                                       Local Tunnel                                              */
    /***************************************************************************************************/

    /**
     * Create local tunnel listener and connect them to the appropriate controller action.
     *
     * @param {SocketIOClient.Socket} socket
     * @private
     */
    _setupSocketsLocalTunnel(socket) {
        const localTunnelController = new LocalTunnelController(socket);
        socket.on('post-localTunnel-start', () => localTunnelController.start());
        socket.on('post-localTunnel-close', () => localTunnelController.close());
    }
}

const socketManagerService = new SocketManagerService();
export default socketManagerService;