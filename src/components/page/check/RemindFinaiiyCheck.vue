<template>
    <div class="panel br">
        <div class="px pb_x2">
            <p class="h5">收集个人资料声明</p>
            <p class="pb pt_s a">按此阅览《收集个人资料声明》之内容</p>
            <div class="pt">
                <input-check-box :pk="1">
                    本人/吾等特此确认已阅览《收集个人资料声明》之内容；
                </input-check-box>
                <br/>
                <input-check-box :pk="2">
                    本人同意保证作为国际集团公司，为提供保险相关产品或服务，可能需要在中国内地境外储存或处理您的个人信息，更多咨询，请参阅保证的《隐私声明》；
                </input-check-box>
                <br/>
                <input-check-box :pk="3">
                    保证有意向阁下发送促销信息或资料，但仅经过阁下同意我们才可以这样做。如阁下同意，保证将可能使用阁下的联络资料及有关阁下已购买的产品的资料（包括购买有关产品的销售渠道）。如同意，请勾选左方的空格；
                </input-check-box>
                <br/>
                <input-check-box :pk="4">
                    本人/吾等，明白在此申请时所使用的手提电话号码/电邮地址是来自本人/吾等的保单记录，系统将会以手机短讯形式或电邮发送身份验证码及有关此申请进度的相关通知到保单持有人保单记录的手提电话号码或电邮地址；
                </input-check-box>
            </div>  
                <br/>
            <p>
                按“确认及发送一次有效验证码”即代表本人确认明白并同意:&nbsp;(1)上述声明之内容；(2)上述《收集个人资料声明》部分之内容；及(3)《隐私政策》。“一次有效验证码”将会经手机短讯发送到您的手提电话号码。
            </p>
        </div>
    </div>
</template>

<script>
import InputCheckBox from '../../../funcks/ui/input/InputCheckBox.vue'
export default {
  components: { InputCheckBox },

}
</script>

<style>

</style>