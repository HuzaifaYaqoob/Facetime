


import { store } from '../..'


let chunks = []

let media_recorder = undefined

export const startRecording = (data, success, fail) => {
    const state = store.getState()

    let new_stream = new MediaStream()

    if (state.user.stream.screen_share) {
        state.user.stream.screen_share.getVideoTracks().forEach(trck => {
            new_stream.addTrack(trck)
        });
    }
    if (state.user.stream.video_stream) {
        state.user.stream.video_stream.getVideoTracks().forEach(trck => {
            new_stream.addTrack(trck)
        });
    }

    if (state.user.stream.audio_stream) {
        state.user.stream.audio_stream.getAudioTracks().forEach(trck => {
            new_stream.addTrack(trck)
        });
    }

    state.connection.connections.map((cnt) => {
        cnt.stream.getAudioTracks().forEach(trck => {
            new_stream.addTrack(trck)
        })
    })

    let recorder = new MediaRecorder(new_stream, { mimeType: 'video/webM' })

    recorder.start(1000)
    media_recorder = recorder

    recorder.ondataavailable = (e) => {
        if (e.data) {
            chunks.push(e.data)
        }
    }

    store.dispatch(
        {
            type: 'TOGGLE_RECORDING',
            payload: true
        }
    )
    store.dispatch({
        type: 'ADD_OR_REMOVE_SNACK_BAR',
        payload: {
            message: 'Recording Started...',
            type: 'info'
        }
    })
}

export const DownloadRecording = (data, success, fail) => {
    let blob_obj = new Blob(chunks, { type: 'video/mp4' })
    console.log('gonna download')

    let anchor = document.createElement('a')
    anchor.href = URL.createObjectURL(blob_obj)
    anchor.target = '_blank'
    anchor.download = 'recorded_media_file.mp4'
    anchor.click()
    store.dispatch({
        type: 'ADD_OR_REMOVE_SNACK_BAR',
        payload: {
            message: 'Download started...',
            type: 'info'
        }
    })
}

export const stopRecording = (data, success, fail) => {
    const state = store.getState()

    if (media_recorder) {
        media_recorder.stop()
        DownloadRecording()
    }

    store.dispatch(
        {
            type: 'TOGGLE_RECORDING',
            payload: false
        }
    )
    store.dispatch({
        type: 'ADD_OR_REMOVE_SNACK_BAR',
        payload: {
            message: 'Recording Stopped',
            type: 'info'
        }
    })
}
