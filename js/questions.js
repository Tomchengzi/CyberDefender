// 网络安全知识题库
const questionsData = [
    {
        question: "什么是钓鱼攻击(Phishing)?",
        options: [
            "通过发送恶意链接或附件诱导用户泄露敏感信息的攻击方式",
            "利用网络漏洞获取未授权访问的攻击方式",
            "通过暴力破解密码的攻击方式",
            "利用硬件漏洞进行的攻击方式"
        ],
        correctIndex: 0,
        explanation: "钓鱼攻击是一种社会工程学攻击，攻击者通过伪装成可信实体，发送欺骗性电子邮件、消息或创建虚假网站，诱导用户点击恶意链接或提供敏感信息。"
    },
    {
        question: "以下哪种密码最安全?",
        options: [
            "password123",
            "P@ssw0rd",
            "Tr7&9Kp*2sQ!5Lm",
            "mybirthday1990"
        ],
        correctIndex: 2,
        explanation: "强密码应包含大小写字母、数字和特殊字符的组合，且长度至少12位以上。'Tr7&9Kp*2sQ!5Lm'符合这些条件，而其他选项要么太简单，要么使用了常见词汇。"
    },
    {
        question: "以下哪项不是防范勒索软件的有效方法?",
        options: [
            "定期备份重要数据",
            "及时更新系统和软件",
            "打开所有邮件附件以检查是否安全",
            "使用防病毒软件"
        ],
        correctIndex: 2,
        explanation: "打开未知邮件附件是非常危险的行为，这可能会直接触发勒索软件。应该避免打开来源不明的附件，并使用防病毒软件事先扫描。"
    },
    {
        question: "什么是多因素认证(MFA)?",
        options: [
            "使用多个密码登录",
            "结合多种不同类型的验证方式进行身份认证",
            "在多个设备上同时登录",
            "使用多个用户名登录"
        ],
        correctIndex: 1,
        explanation: "多因素认证(MFA)要求用户提供两种或更多的验证方式，通常包括：知道的信息（如密码）、拥有的物品（如手机）、生物特征（如指纹）。这大大提高了账户安全性。"
    },
    {
        question: "以下哪种行为最容易导致个人信息泄露?",
        options: [
            "使用公共WiFi时访问网上银行",
            "在社交媒体设置强密码",
            "定期更新操作系统",
            "使用防病毒软件"
        ],
        correctIndex: 0,
        explanation: "在公共WiFi网络上访问网上银行等敏感服务非常危险，因为这些网络通常不安全，容易受到中间人攻击。如必须使用公共WiFi，应该使用VPN加密连接。"
    },
    {
        question: "什么是社会工程学攻击中的'假托权威'?",
        options: [
            "伪装成技术支持人员",
            "伪装成公司高管要求紧急转账",
            "伪装成普通员工",
            "伪装成客户"
        ],
        correctIndex: 1,
        explanation: "假托权威是一种常见的社会工程学攻击手法，攻击者冒充公司高管或权威人士，利用下属对上级的服从心理，要求执行一些违反安全规程的操作，如紧急转账。"
    },
    {
        question: "以下哪种行为有助于防范USB设备相关的安全威胁?",
        options: [
            "使用任何找到的USB设备",
            "禁用USB端口的自动运行功能",
            "不检查直接插入USB设备",
            "允许所有USB设备自动运行"
        ],
        correctIndex: 1,
        explanation: "禁用USB端口的自动运行功能可以防止恶意USB设备自动执行有害程序。此外，应该只使用可信来源的USB设备，并在使用前进行病毒扫描。"
    },
    {
        question: "什么是'零信任'安全模型?",
        options: [
            "完全信任内部网络",
            "不进行任何安全验证",
            "默认不信任任何人或设备，要求持续验证",
            "只信任高级管理员"
        ],
        correctIndex: 2,
        explanation: "零信任安全模型的核心理念是'永不信任，始终验证'，不管请求来自内部还是外部网络，都需要进行身份验证和授权。这种方法提供了更好的安全性。"
    },
    {
        question: "什么是'供应链攻击'?",
        options: [
            "攻击物流系统",
            "通过破坏软件的开发或分发过程来植入恶意代码",
            "攻击供应商网站",
            "破坏产品包装"
        ],
        correctIndex: 1,
        explanation: "供应链攻击是指攻击者通过入侵软件的开发、构建或分发过程，在合法软件中植入恶意代码。这种攻击特别危险，因为恶意代码会通过受信任的渠道分发给用户。"
    },
    {
        question: "以下哪项不是有效的密码管理实践?",
        options: [
            "使用密码管理器",
            "在便利贴上记录密码",
            "启用双因素认证",
            "定期更改密码"
        ],
        correctIndex: 1,
        explanation: "在便利贴或其他容易被他人看到的地方记录密码是非常危险的行为。应该使用专业的密码管理器来安全地存储和管理密码。"
    },
    {
        question: "在一次会议中，一位自称是公司IT部门的技术人员打电话给你，说需要远程访问你的电脑进行紧急安全更新。你应该怎么做?",
        options: [
            "立即同意并提供远程访问权限",
            "直接拒绝任何远程访问请求",
            "通过公司内部官方渠道验证这个请求的真实性",
            "要求对方发送邮件确认"
        ],
        correctIndex: 2,
        explanation: "这可能是社会工程学攻击。正确的做法是通过公司官方渠道（如IT服务台电话）验证该请求的真实性，而不是直接相信来电者的身份。即使对方提供了看似合理的理由，也应该先验证。"
    },
    {
        question: "你收到一封来自银行的紧急邮件，称你的账户有异常活动，需要立即点击邮件中的链接登录验证。这时你应该?",
        options: [
            "立即点击邮件中的链接登录",
            "直接回复邮件询问详情",
            "忽略邮件并删除",
            "不点击邮件链接，而是直接打开浏览器访问银行官网或使用银行APP查看"
        ],
        correctIndex: 3,
        explanation: "这是典型的钓鱼邮件手法。永远不要点击邮件中的链接来登录银行账户，而应该直接访问银行官方网站或使用官方APP。银行通常不会通过邮件要求客户点击链接登录。"
    },
    {
        question: "在公司工作时，你的同事小李因为急需处理一份文件，但忘记了密码，请你使用你的账号登录系统帮他完成工作。你应该?",
        options: [
            "出于同事情谊，借给他使用",
            "告诉他密码找回的正确流程",
            "帮他用你的账号完成工作",
            "把你的密码告诉他"
        ],
        correctIndex: 1,
        explanation: "账号共享是严重的安全隐患。每个人都应该使用自己的账号，这样可以保证操作可追溯性。应该指导同事通过正确的途径找回密码或联系IT支持。"
    },
    {
        question: "你在咖啡厅工作，需要参加一个重要的在线会议，这时你发现咖啡厅的WiFi有两个：'CoffeeShop_Free' 和 'CoffeeShop_Secure'，你应该选择?",
        options: [
            "选择'CoffeeShop_Free'因为免费",
            "选择信号最强的那个",
            "使用手机热点或VPN连接",
            "随便选择一个即可"
        ],
        correctIndex: 2,
        explanation: "在公共场所处理敏感工作时，应该避免使用公共WiFi，因为这可能被黑客用来进行中间人攻击。最安全的方式是使用手机热点或通过VPN加密连接。"
    },
    {
        question: "你的一位外国客户通过电子邮件要求更改他们的银行账户信息用于收款，你应该?",
        options: [
            "直接根据邮件内容更改账户信息",
            "回复邮件确认一下",
            "通过之前已验证的联系方式（如电话）与客户确认",
            "将新账户信息抄送给财务部"
        ],
        correctIndex: 2,
        explanation: "这可能是商务电子邮件诈骗(BEC)。应该通过之前已经确认的可靠联系方式（如已知的电话号码）与客户核实，而不是仅依赖邮件通信。黑客可能已经入侵了客户的邮箱。"
    },
    {
        question: "在处理公司机密文件时，下列哪种做法最不安全?",
        options: [
            "使用公司批准的加密工具",
            "通过个人微信传输文件因为方便快捷",
            "使用公司的安全文件传输系统",
            "在需要时进行权限审批"
        ],
        correctIndex: 1,
        explanation: "使用未经公司批准的个人通讯工具传输机密文件是非常危险的。这可能违反公司安全政策，且无法保证数据传输的安全性和可追溯性。应该使用公司批准的安全传输渠道。"
    },
    {
        question: "你收到一个自称是快递公司的短信，说你有一个包裹无法投递，需要点击链接填写信息，这时你应该?",
        options: [
            "立即点击链接查看详情",
            "把链接转发给朋友确认",
            "直接拨打快递公司官方客服电话查询",
            "回复短信询问详情"
        ],
        correctIndex: 2,
        explanation: "这是常见的钓鱼短信诈骗手法。不要点击来源不明的链接，应该通过官方渠道（如快递公司官网或官方客服电话）查询包裹信息。"
    },
    {
        question: "在进行线上银行转账时，你发现网址是'https://mybank-secure.com'而不是平常使用的'https://mybank.com'，你应该?",
        options: [
            "网址有'https'和'secure'应该是安全的",
            "立即停止操作并关闭网页",
            "继续操作因为可能是银行新域名",
            "先进行一笔小额测试"
        ],
        correctIndex: 1,
        explanation: "这很可能是钓鱼网站。即使网址看起来相似且使用了HTTPS，也可能是诈骗者精心伪装的。银行域名的细微变化通常意味着这是钓鱼网站，应该立即停止操作并报告。"
    },
    {
        question: "在家办公时，你的笔记本电脑突然弹出窗口说检测到病毒，需要立即下载某防病毒软件，你应该?",
        options: [
            "立即下载并安装推荐的软件",
            "关闭弹窗继续工作",
            "断开网络连接，联系公司IT支持",
            "重启电脑看看是否解决"
        ],
        correctIndex: 2,
        explanation: "这可能是恶意软件的诈骗弹窗。不要下载来源不明的软件，应该断开网络连接以防止可能的恶意软件传播，并立即联系公司IT支持获取专业帮助。"
    },
    {
        question: "你在公共场所使用笔记本电脑工作，暂时需要离开去洗手间，以下哪种做法最安全?",
        options: [
            "请旁边看起来可靠的人帮忙看管",
            "将笔记本合上但不锁屏",
            "锁定屏幕并带走笔记本",
            "简单放在座位上因为很快回来"
        ],
        correctIndex: 2,
        explanation: "在公共场所离开工作设备时，不应该相信陌生人，即使他们看起来可靠。最安全的做法是锁定屏幕并随身携带设备，或将设备安全存放。即使是短暂离开也应如此。"
    },
    {
        question: "你在使用公司电脑时，收到一个弹窗提示需要更新Adobe Flash Player，你应该怎么做？",
        options: [
            "立即点击弹窗中的'立即更新'按钮",
            "通过官方网站或应用商店下载更新",
            "询问同事这个弹窗是否可信",
            "忽略弹窗并继续工作"
        ],
        correctIndex: 1,
        explanation: "随机弹出的更新提示可能是恶意软件。应该通过官方渠道（如Adobe官网或可信的应用商店）下载更新，而不是点击弹窗中的链接。"
    },
    {
        question: "你的同事通过微信发给你一个压缩文件，说是重要的工作文档，你应该如何处理？",
        options: [
            "直接下载并打开文件",
            "先用杀毒软件扫描后再打开",
            "通过其他渠道（如电话）向同事确认文件的真实性",
            "转发给其他同事确认"
        ],
        correctIndex: 2,
        explanation: "即使是来自同事的文件也可能存在风险，因为他们的账号可能被盗用。最安全的做法是通过其他独立渠道（如电话）向发送者确认文件的真实性。"
    },
    {
        question: "你在家办公时需要访问公司内部系统，最安全的连接方式是？",
        options: [
            "直接通过公共WiFi连接",
            "使用个人手机热点",
            "使用公司提供的VPN连接",
            "通过家人的电脑连接"
        ],
        correctIndex: 2,
        explanation: "访问公司内部系统时，应该使用公司提供的VPN连接，这样可以确保数据传输的安全性和加密性，防止敏感信息泄露。"
    },
    {
        question: "你发现公司网站上有一个安全漏洞，正确的做法是？",
        options: [
            "在社交媒体上公开讨论这个漏洞",
            "私下告诉几个同事",
            "尝试自己修复这个漏洞",
            "按照公司安全政策向相关负责人报告"
        ],
        correctIndex: 3,
        explanation: "发现安全漏洞时，应该遵循公司的安全政策，向指定的安全团队或负责人报告。公开讨论或私下传播可能会增加被利用的风险。"
    },
    {
        question: "你需要为多个网站设置密码，最安全的做法是？",
        options: [
            "对所有网站使用同一个复杂密码",
            "使用密码管理工具生成并存储不同的强密码",
            "使用容易记住的个人信息作为密码",
            "将所有密码记录在手机备忘录中"
        ],
        correctIndex: 1,
        explanation: "使用密码管理工具可以为每个网站生成唯一的强密码，并安全地存储这些密码。这样即使一个网站的密码泄露，其他账户仍然安全。"
    },
    {
        question: "在处理含有个人身份信息(PII)的文件时，以下哪种做法是正确的？",
        options: [
            "通过公共打印机打印后立即取走",
            "在完成工作后将文件保存在共享文件夹中",
            "按照数据分类政策加密存储并限制访问权限",
            "通过个人邮箱发送给自己以便在家继续工作"
        ],
        correctIndex: 2,
        explanation: "含有个人身份信息的文件应该按照数据分类政策进行保护，包括加密存储和访问控制，以防止未授权访问和数据泄露。"
    },
    {
        question: "你收到一封声称来自公司CEO的邮件，要求你紧急转账或提供敏感信息，你应该？",
        options: [
            "立即执行，因为这是CEO的要求",
            "回复邮件确认细节",
            "通过公司正规渠道验证请求的真实性",
            "转发给财务部门处理"
        ],
        correctIndex: 2,
        explanation: "这可能是CEO欺诈(CEO Fraud)，攻击者冒充高管发送紧急请求。应该通过公司已建立的正规渠道（如直接电话联系）验证请求的真实性，而不是仅依赖邮件通信。"
    },
    {
        question: "在参加视频会议讨论敏感项目时，你应该注意什么？",
        options: [
            "在咖啡厅等公共场所参加会议没有问题",
            "确保使用公司批准的视频会议工具并注意周围环境",
            "可以录制会议内容以便日后回顾",
            "可以邀请相关同事一起旁听"
        ],
        correctIndex: 1,
        explanation: "讨论敏感项目时，应使用公司批准的安全视频会议工具，并确保在私密环境中参会，避免信息被窃听。未经授权不应录制会议或邀请无关人员参加。"
    },
    {
        question: "你的笔记本电脑被盗了，里面有公司数据，你应该立即做什么？",
        options: [
            "等待几天看能否找回",
            "自己购买新电脑替换",
            "立即向IT部门和安全团队报告",
            "只需要向直属领导报告即可"
        ],
        correctIndex: 2,
        explanation: "设备丢失可能导致数据泄露。应立即向IT部门和安全团队报告，这样他们可以采取措施，如远程擦除数据、撤销访问凭证、评估潜在影响等。"
    },
    {
        question: "你注意到一位陌生人尾随同事进入了公司需要门禁卡才能进入的区域，你应该？",
        options: [
            "不管，可能是新员工",
            "直接询问那位陌生人",
            "通知安保人员或相关负责人",
            "发邮件给部门经理"
        ],
        correctIndex: 2,
        explanation: "这是典型的尾随入侵(Tailgating)行为。应立即通知安保人员或相关负责人，而不是自己直接面对可能的安全威胁。保持警惕是每个员工的责任。"
    },
    {
        question: "你收到一条短信，声称你的银行账户有异常活动，并提供了一个链接让你登录查看，你应该怎么做？",
        options: [
            "点击链接并输入你的账户信息",
            "回复短信询问更多细节",
            "忽略该短信，直接通过银行官方应用或官网查看账户",
            "将短信转发给朋友询问是否收到类似信息"
        ],
        correctIndex: 2,
        explanation: "这很可能是钓鱼攻击。永远不要点击来路不明短信中的链接。如果担心账户安全，应通过官方渠道（如银行官方应用或官网）登录查看，或直接致电银行客服。"
    },
    {
        question: "关于公共WiFi网络，以下说法正确的是？",
        options: [
            "公共WiFi完全安全，可以放心使用",
            "只要网络有密码就可以安全使用",
            "使用公共WiFi时应避免访问敏感网站或传输敏感信息",
            "使用隐身模式浏览可以保护在公共WiFi上的安全"
        ],
        correctIndex: 2,
        explanation: "公共WiFi网络（即使有密码）也可能被监听或遭受中间人攻击。在使用公共WiFi时，应避免访问银行、电子邮件等敏感网站，或传输敏感信息。如需访问，建议使用VPN加密连接。"
    },
    {
        question: "以下哪种行为可能导致勒索软件感染？",
        options: [
            "安装官方应用商店的应用",
            "打开未知来源的电子邮件附件",
            "使用公司提供的杀毒软件",
            "定期更新操作系统"
        ],
        correctIndex: 1,
        explanation: "打开未知来源的电子邮件附件是勒索软件感染的常见途径。勒索软件会加密用户文件并要求支付赎金。应避免打开可疑附件，并保持系统和安全软件更新。"
    },
    {
        question: "关于多因素认证(MFA)，以下说法正确的是？",
        options: [
            "多因素认证会使登录过程变得不必要的复杂",
            "只有银行等金融机构才需要使用多因素认证",
            "多因素认证可以显著提高账户安全性，即使密码泄露",
            "使用多因素认证后就不需要设置复杂密码了"
        ],
        correctIndex: 2,
        explanation: "多因素认证结合了'你知道的'(密码)、'你拥有的'(手机或令牌)和'你是谁'(生物特征)等多种因素，即使密码被盗，攻击者没有第二因素也无法登录，显著提高了账户安全性。"
    },
    {
        question: "你的同事向你借用工作账号权限完成一项紧急任务，你应该怎么做？",
        options: [
            "出于同事情谊，提供你的账号和密码",
            "拒绝并建议他向IT部门申请临时权限",
            "帮他用你的账号完成任务",
            "告诉他使用管理员默认账号"
        ],
        correctIndex: 1,
        explanation: "共享账号违反了最小权限原则和账号责任制。每个操作都应该可以追溯到特定个人。应拒绝共享账号，并建议同事通过正规渠道申请所需权限。"
    },
    {
        question: "关于社交媒体安全，以下做法最安全的是？",
        options: [
            "接受所有好友请求以扩大社交圈",
            "分享你的日常行程让朋友了解你的动态",
            "定期检查隐私设置并限制个人信息可见范围",
            "使用真实个人信息便于老朋友找到你"
        ],
        correctIndex: 2,
        explanation: "社交媒体上的过度分享可能导致个人信息泄露和社会工程学攻击。应定期检查隐私设置，限制个人敏感信息的可见范围，并谨慎接受陌生人的好友请求。"
    },
    {
        question: "你发现公司内网的一台服务器可以无需认证访问，你应该怎么做？",
        options: [
            "不管它，反正在内网应该是安全的",
            "尝试访问看里面有什么有趣的数据",
            "告诉几个同事一起研究这个问题",
            "向IT安全团队报告这个潜在的安全问题"
        ],
        correctIndex: 3,
        explanation: "发现安全漏洞应立即报告给安全团队，而不是忽视或自行探索。未经授权访问系统（即使是内部系统）可能违反公司政策甚至法律法规。"
    },
    {
        question: "关于软件更新，以下说法正确的是？",
        options: [
            "软件更新主要是添加新功能，可以选择不更新",
            "只有操作系统需要定期更新，应用软件无所谓",
            "应该及时安装安全更新，因为它们通常修复了已知漏洞",
            "更新太频繁会降低系统性能，应该尽量避免"
        ],
        correctIndex: 2,
        explanation: "软件更新经常包含重要的安全补丁，修复可能被攻击者利用的漏洞。及时更新操作系统和应用软件是基本的安全实践，可以显著降低被攻击的风险。"
    },
    {
        question: "以下哪种行为可能违反数据保护法规？",
        options: [
            "在获得明确同意后收集客户数据",
            "将客户数据用于未经授权的营销目的",
            "按照公司政策安全存储客户数据",
            "在数据泄露后立即通知相关方"
        ],
        correctIndex: 1,
        explanation: "未经授权将客户数据用于收集时未说明的目的（如营销）违反了多数数据保护法规（如GDPR、CCPA等）。使用个人数据应遵循目的限制原则，只能用于收集时明确告知并获得同意的目的。"
    },
    {
        question: "关于物联网(IoT)设备安全，以下做法最佳的是？",
        options: [
            "使用设备默认密码以免忘记",
            "所有设备连接到同一网络以便统一管理",
            "更改默认密码并定期更新设备固件",
            "禁用自动更新功能以避免设备重启"
        ],
        correctIndex: 2,
        explanation: "物联网设备常因默认密码和过时固件而成为安全弱点。应更改默认密码设置为强密码，并保持固件更新以修补安全漏洞。理想情况下，还应考虑将IoT设备与主网络隔离。"
    }
];

// 将题库分块加载
const questionsChunks = {
    chunk1: questionsData.slice(0, 10),
    chunk2: questionsData.slice(10, 20),
    chunk3: questionsData.slice(20, 30)
};

// 按需加载题目
function getQuestions() {
    return new Promise((resolve) => {
        // 模拟异步加载
        setTimeout(() => {
            resolve(questionsData);
        }, 0);
    });
}

// 导出题库供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = questionsData;
} 