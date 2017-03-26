export default{
  layout: 'admin',
  head () {
    return {
      titleTemplate: '%s - 登录'
    }
  },
  data () {
    return {
      ruleForm2: {
        account: '',
        checkPass: ''
      },
      rules2: {
        account: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }
        ],
        checkPass: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      },
      checked: true
    }
  },
  methods: {
    handleReset2 () {
      this.$refs.ruleForm2.resetFields()
    },
    handleSubmit2 () {
      var _this = this
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          this.$store.commit('setLogin', true)
          _this.$router.replace('/admin/')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
