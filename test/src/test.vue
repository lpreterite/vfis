<template>
    <div class="test" __vuec__>
        <h2>It is test components.</h2>
        <h3>Mock Data Test</h3>
        <code>{{ stringify(mockData) }}</code>
        <h3>Image Test</h3>
        <p><img :src="img" alt="233.jpg"> 31.3k is link</p>
        <p><img :src="icon" alt="music.png"> 2.01k is base64</p>
        <p><img :src="heix" alt="heix.png">heix.png origin 18.0k, now 2.7k is compressed</p>
    </div>
</template>

<script>
    import img from './imgs/233.jpg';
    import icon from './imgs/music.png';
    import heix from './imgs/heix.png';

    function getMockData(vm){
        fetch('/api/task/search').then(res=>{
            if(res.status === 200){
                res.json().then(json=> vm.mockData = json);
                vm.message = 'get mock data success!'
            }else{
                vm.message = 'get mock data error!'
            }
        })
        vm.mockData
    }

    export default {
        ready(){
            getMockData(this)
        },
        data(){
            return {
                message: '',
                mockData: {},
                img,
                icon,
                heix
            }
        },
        methods: {
            stringify:JSON.stringify
        }
    }
</script>

<style lang="scss">
    .test[__vuec__]{
        background-color: #eee;
    }
</style>