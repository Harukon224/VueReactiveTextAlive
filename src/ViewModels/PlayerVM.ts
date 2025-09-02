import { type IDataLoader, type IVideo, Player, PlayerOptions } from "textalive-app-api";
import { computed, type ComputedRef, ref, type Ref } from "vue";

export class PlayerVM {
    public readonly model: Player

    private _dataRef:           Ref<IDataLoader>
    private _isPlayingRef:      Ref<boolean>
    private _isVideoSeekingRef: Ref<boolean>
    private _videoRef:          Ref<IVideo>
    private _volumeRef:         Ref<number>
    private _timerPositionRef:  Ref<number>

    public readonly dataRef: ComputedRef<IDataLoader> = computed(() => this._dataRef.value)

    public readonly isPlayingRef: ComputedRef<boolean> = computed(() => this._isPlayingRef.value)

    public readonly isVideoSeekingRef: ComputedRef<boolean> = computed(() => this._isVideoSeekingRef.value)

    public readonly videoRef: ComputedRef<IVideo> = computed(() => this._videoRef.value)

    public readonly volumeRef: ComputedRef<number> = computed({
        get: () => this._volumeRef.value,
        set: (value: number) => this.model.volume = value
    })

    public readonly timerPositionRef: ComputedRef<number> = computed(() => this._timerPositionRef.value)

    constructor(options?: PlayerOptions) {
        this.model = new Player(options);
        
        this._dataRef           = ref(this.model.data);
        this._isPlayingRef      = ref(this.model.isPlaying);
        this._isVideoSeekingRef = ref(this.model.isVideoSeeking);
        this._videoRef          = ref(this.model.video);
        this._volumeRef         = ref(this.model.volume);
        this._timerPositionRef  = ref(this.model.timer.position);

        this._dataRef.value = this.model.data;

        this.model.addListener({
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
                this._dataRef.value          = this.model.data;
                this._isPlayingRef.value     = this.model.isPlaying;
                this._videoRef.value         = this.model.video;
                this._timerPositionRef.value = this.model.timer.position;
            },
            onVolumeUpdate: (volume: number) => {
                this._volumeRef.value = volume;
            }
        });
    }
}