export default{
  layout: 'admin',
  head () {
    return {
      titleTemplate: '%s - 登录'
    }
  },
  data () {
    return {
      ruleForm: {
        account: '',
        checkPass: ''
      },
      rules: {
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
    handleReset () {
      this.$refs.ruleForm.resetFields()
    },
    handleSubmit () {
      var _this = this
      this.$refs.ruleForm.validate((valid) => {
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
