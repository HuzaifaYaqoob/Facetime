
import { add_video_to_stream } from "../actions/Video"


export class ScreenShare {

    constructor() {
        this.stream_in = null
    }

    get_permissions = (success, fail) => {
        navigator.mediaDevices.getDisplayMedia().then(stream => {
            console.log(stream)
            this.stream_in = stream
            success && success(this.stream_in)
        })
            .catch(err => {
                console.log(err)
                fail && fail()
            })
    }

    close_screen_sharing = (success, fail) => {
        try {

            this.stream_in.getTracks().forEach(track => {
                track.stop()
            })
            success && success()
        }
        catch {
            fail && fail()
        }
    }
}
