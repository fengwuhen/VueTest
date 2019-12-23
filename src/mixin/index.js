import {
    mapGetters
} from "vuex";

export default {
    data() {
        return {}
    },
    computed: {
        ...mapGetters(['moduleTip','web_site_name'])
    },
    created() {
        alert('全局混乱引入成功')
    },
    methods: {}
}