import {
    mapGetters
} from "vuex";

export default {
    data() {
        return {}
    },
    computed: {
        ...mapGetters(["moduleTip", "isCollapse", "themeColor", "oldThemeColor"])
    },
    created() {

    },
    mounted() {
        // alert('全局混乱引入成功');
    },
    methods: {}
}