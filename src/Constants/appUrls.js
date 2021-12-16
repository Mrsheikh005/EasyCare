const DOMAIN ="https://greenery.xpertsgroup.net/public/api/";
module.exports={
    LOGIN: DOMAIN + 'userLogin',
    REGISTER: DOMAIN + 'userRegister',
    JOB:DOMAIN+ 'createJob',
    JOBDETAILS: DOMAIN + 'jobDetail',
    JOBLIST: DOMAIN +'openJobs',
    USERS:DOMAIN +'allUsers',
    NEWS:DOMAIN +'createNews',
    NEWSLIST: DOMAIN + 'allNews',
    NEWSDETAIL: DOMAIN + 'newsDetail',
    APPLYJOB: DOMAIN +'applyJob',
    PENDINGJOB: DOMAIN +'pendingJobs',
    APPLIEDJOBS:DOMAIN +'appliedJobs',
    CONFIRMJOB:DOMAIN + 'confirmJob',
    CONFIRMJOBLIST: DOMAIN + 'confirmJobs',
    APPLIEDDETAIL: DOMAIN +'jobUsers',
    FINISHJOB: DOMAIN + 'finishJob',
    ALLJOBS:DOMAIN + 'Jobs',
    STARTCHAT:DOMAIN + 'addChat',
    CHATDETAIL:DOMAIN + 'listChat',
    CHATUSERS: DOMAIN + 'listChatUsers',
    MAKELEADER:DOMAIN + 'makeLeader',
    PROFILEDETAIL: DOMAIN +'userInfo',
    FORGETPASSWORD: DOMAIN + 'forgetPassword',
    UPDATEPROFILE: DOMAIN + 'updateUserInfo'

}