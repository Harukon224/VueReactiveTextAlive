import { type IDataLoader, type IVideo, Player, PlayerOptions } from "textalive-app-api";
import { computed, type ComputedRef, ref, type Ref } from "vue";

export class PlayerVM extends Player {
    private _dataRef:           Ref<IDataLoader>
    private _isPlayingRef:      Ref<boolean>
    private _isVideoSeekingRef: Ref<boolean>
    private _videoRef:          Ref<IVideo>
    private _volumeRef:         Ref<number>
    private _timerPositionRef:  Ref<number>

    public dataRef: ComputedRef<IDataLoader> = computed(() => this._dataRef.value)

    public isPlayingRef: ComputedRef<boolean> = computed(() => this._isPlayingRef.value)

    public isVideoSeekingRef: ComputedRef<boolean> = computed(() => this._isVideoSeekingRef.value)

    public videoRef: ComputedRef<IVideo> = computed(() => this._videoRef.value)

    public volumeRef: ComputedRef<number> = computed(() => this._volumeRef.value)

    public timerPositionRef: ComputedRef<number> = computed(() => this._timerPositionRef.value)

    constructor(options?: PlayerOptions) {
        super(options);

        this._dataRef           = ref(this.data);
        this._isPlayingRef      = ref(this.isPlaying);
        this._isVideoSeekingRef = ref(this.isVideoSeeking);
        this._videoRef          = ref(this.video);
        this._volumeRef         = ref(this.volume);
        this._timerPositionRef  = ref(this.timer.position);

        this._dataRef.value = this.data;

        super.addListener({
            onPause: () => {
                this._isPlayingRef.value = false;
            },
            onPlay: () => {
                this._isPlayingRef.value = true;
            },
            onStop: () => {
                this._isPlayingRef.value = false;
            },
            onTimeUpdate: (position: number) => {
                this._timerPositionRef.value = position;
            },
            onVideoSeekEnd: () => {
                this._isVideoSeekingRef.value = false;
            },
            onVideoSeekStart: () => {
                this._isVideoSeekingRef.value = true;
            },
            onVideoReady: () => {
                this._dataRef.value          = this.data;
                this._isPlayingRef.value     = this.isPlaying;
                this._videoRef.value         = this.video;
                this._timerPositionRef.value = this.timer.position;
            },
            onVolumeUpdate: (volume: number) => {
                this._volumeRef.value = volume;
            }
        });
    }
}