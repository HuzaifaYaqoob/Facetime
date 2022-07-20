

export const PlaySound = () => {
    let audio = new Audio(`${process.env.PUBLIC_URL}/Media/beep_sound.mp3`)
    audio.play()
}