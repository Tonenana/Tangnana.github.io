// 购物车数据
let cart = [];
// 用户登录状态
let userLoggedIn = false;
let currentUser = '';
// 搜索历史记录
let searchHistory = JSON.parse(localStorage.getItem('flowerSearchHistory')) || [];
// 订单数据
let userOrders = JSON.parse(localStorage.getItem('userOrders')) || {};
// 用户个人数据
let userProfiles = JSON.parse(localStorage.getItem('userProfiles')) || {};
// 用户地址数据
let userAddresses = JSON.parse(localStorage.getItem('userAddresses')) || {};
// 用户收藏数据
let userFavorites = JSON.parse(localStorage.getItem('userFavorites')) || {};
// 花卉收藏管理器
let favoriteManager = null;
// 当前查看的花卉ID
let currentFlowerId = null;
// 当前查看的订单状态
let currentOrderStatus = 'all';
// 当前个人中心活动部分
let currentProfileSection = 'overview';

// 花卉详情数据（合并成一个对象）
const flowerDetails = {
    1: {
        name: "粉荔枝",
        price: "158",
        category: "玫瑰",
        description: "粉荔枝的花语是守护的爱。奥斯汀花型，花色柔和，如婚礼、情人节、母亲节，或是作为日常的礼物。浪漫的不是花，是送花的人。",
        language: "守护的爱、甜蜜的初恋",
        care: {
            "醒花": "深水醒花3-5小时",
            "修剪": "去腐叶烂花，花枝底端斜口剪",
            "水位": "花瓶2/3左右",
            "换水": "每3-4天换一次水",
            "摆放": "避免阳光直射和空调出风口"
        },
        image: "https://p3-flow-imagex-download-sign.byteimg.com/tos-cn-i-a9rns2rl98/f6c440817bf94e8e8f9f93d31ebef7aa.jpg~tplv-a9rns2rl98-24:720:720.image?rcl=202512031856446D2AE580267218078A57&rk3s=8e244e95&rrcfp=8a172a1a&x-expires=1765364205&x-signature=HCDSYvCXy043lZb%2BPau8ZMR5Y44%3D"
    },
    2: {
        name: "粉玫瑰",
        price: "120",
        category: "玫瑰",
        description: "粉玫瑰适合出现在各种场合，因为喜欢，所以被期待。最浪漫的是送花的人，最美好的是收到花的你。",
        language: "喜欢你那灿烂的笑容、初恋",
        care: {
            "醒花": "带叶深水醒花3-5小时",
            "修剪": "45度斜剪根，去除多余叶片",
            "水位": "花瓶的1/2至2/3",
            "换水": "每2-3天换一次水",
            "营养": "每次换水添加鲜花营养液"
        },
        image: "https://p11-flow-imagex-download-sign.byteimg.com/tos-cn-i-a9rns2rl98/371ba3363eef415b8b98446bf9cebaf8.jpg~tplv-a9rns2rl98-24:720:720.image?rcl=20251203200945E64A6C401B7832C01E75&rk3s=8e244e95&rrcfp=8a172a1a&x-expires=1765368586&x-signature=9zNWWXe%2Br4KfTliNNomauJbBiU0%3D"
    },
    3: {
        name: "粉雪山",
        price: "135",
        category: "玫瑰",
        description: "粉雪山的花语是梦开始的地方，寓意着回到当初追求的起点。颜色多为高级的低饱和奶油灰紫色。",
        language: "梦开始的地方、纯真美好的爱情",
        care: {
            "醒花": "深水醒花4-6小时",
            "修剪": "45度斜剪根，保留2-3片叶子",
            "水位": "花瓶的1/2",
            "换水": "每2天换一次水",
            "注意": "避免花瓣沾水，防止灰霉病"
        },
        image: "https://p26-flow-imagex-download-sign.byteimg.com/tos-cn-i-a9rns2rl98/93c5d13cdb5b4362a02b3eab143e0f92.jpg~tplv-a9rns2rl98-24:720:720.image?rcl=2025120320184347A684B5DB5484A9F60E&rk3s=8e244e95&rrcfp=8a172a1a&x-expires=1765369123&x-signature=nf3of18YXQC2tDAsVf%2BEVf0h7Es%3D"
    },
    4: {
        name: "康乃馨",
        price: "100",
        category: "康乃馨",
        description: "康乃馨是世界上许多文化中'母亲节'的官方鲜花，被誉为母亲之花，象征着爱、魅力和独特。",
        language: "母爱、尊敬、纯洁的爱",
        care: {
            "醒花": "带包装深水醒花2-3小时",
            "修剪": "去除下端叶片，斜剪花茎",
            "水位": "花瓶的1/3",
            "换水": "每3天换一次水",
            "营养": "可添加少量白糖延长花期"
        },
        image: "https://p11-flow-imagex-download-sign.byteimg.com/tos-cn-i-a9rns2rl98/d4ddcdbda6c54397b5762f9dd2c017e5.jpg~tplv-a9rns2rl98-24:720:720.image?rcl=20251203202127ECC5F9894CC696D7C8E0&rk3s=8e244e95&rrcfp=8a172a1a&x-expires=1765369288&x-signature=LLs41Bd8V4z420NenmlJzPNEAJI%3D"
    },
    5: {
        name: "白玫瑰",
        price: "140",
        category: "玫瑰",
        description: "白玫瑰象征纯洁、高贵和天真无邪，常用于婚礼和纪念日，代表永恒的爱与承诺。",
        language: "纯洁的爱、天真、尊敬",
        care: {
            "醒花": "深水醒花4-6小时",
            "修剪": "去除刺和多余叶片，斜剪根部",
            "水位": "花瓶的2/3",
            "换水": "每2天换一次水",
            "注意": "避免强光直射，保持通风"
        },
        image: "https://p26-flow-imagex-download-sign.byteimg.com/tos-cn-i-a9rns2rl98/014b9bf318b246f69504d9e1f7f5aa75.jpg~tplv-a9rns2rl98-24:720:720.image?rcl=20251203202818F84DF0B19C58D96E3483&rk3s=8e244e95&rrcfp=8a172a1a&x-expires=1765369698&x-signature=k%2BPkCxjNzMs77TZz4fZq%2BFkfP%2B8%3D"
    },
    6: {
        name: "郁金香",
        price: "180",
        category: "郁金香",
        description: "郁金香代表完美的爱，不同颜色有不同的花语。红色代表真爱，粉色代表幸福，紫色代表永恒的爱。",
        language: "完美的爱、永恒、幸福",
        care: {
            "醒花": "平剪根部，带包装醒花1-2小时",
            "修剪": "平剪根部，保留叶片",
            "水位": "浅水位，约花瓶的1/3",
            "换水": "每天换水，清洗花瓶",
            "特性": "郁金香会继续长高，向光性强"
        },
        image: "https://p3-flow-imagex-download-sign.byteimg.com/tos-cn-i-a9rns2rl98/0b2374f883ee456f8492959155535f4f.jpg~tplv-a9rns2rl98-24:720:720.image?rcl=202512032030101A4E946F14FD7F461D74&rk3s=8e244e95&rrcfp=8a172a1a&x-expires=1765369810&x-signature=JE1q%2FQ2U4g6iOErsQJt40HG%2Bh6g%3D"
    },
    7: {
        name: "白百合",
        price: "168",
        category: "百合",
        description: "白百合象征纯洁、高雅与神圣，花型舒展大气，香气清新怡人，是婚礼、庆典等重要场合的经典选择，寓意百年好合。",
        language: "纯洁高雅、百年好合、神圣祝福",
        care: {
            "醒花": "去除下部叶片，深水醒花4-6小时",
            "修剪": "花枝斜剪，摘除花蕊避免花粉污染",
            "水位": "中水位，约花瓶的1/2",
            "换水": "每2天换一次水，清洗根部黏液",
            "特性": "香气浓郁，花期约7-10天，避免放置卧室"
        },
        image: "https://p3-flow-imagex-download-sign.byteimg.com/tos-cn-i-a9rns2rl98/b3842a25f6ec4e7a8a1f7a8e93a660d7.jpg~tplv-a9rns2rl98-24:720:720.image?rcl=202512032031577E2D466DD90E910E0F82&rk3s=8e244e95&rrcfp=8a172a1a&x-expires=1765369917&x-signature=i9CKXkCMkIPL519T0CMLSmOZVBo%3D"
    },
    8: {
        name: "薰衣草干花",
        price: "88",
        category: "干花",
        description: "薰衣草干花保留着天然的香气，象征着等待爱情。可放置于卧室、客厅或车内，有安神助眠、净化空气的功效。",
        language: "等待爱情、宁静、守护",
        care: {
            "醒花": "干花无需醒花，拆开包装即可摆放",
            "修剪": "根据摆放需求修剪花枝长度",
            "水位": "干花无需加水，保持干燥",
            "保养": "避免潮湿环境，定期通风晾晒",
            "特性": "香气持久，可保存6-12个月，香味变淡可轻揉花瓣唤醒香气"
        },
        image: "https://p26-flow-imagex-download-sign.byteimg.com/tos-cn-i-a9rns2rl98/23b11ee17acb48569e9aba6cb7927df2.jpg~tplv-a9rns2rl98-24:720:720.image?rcl=202512031711240C5F964A2365D86BC309&rk3s=8e244e95&rrcfp=8a172a1a&x-expires=1765357885&x-signature=pgFTC7ZcrM4ovyfNvgQH%2FQdnwf4%3D"
    },
    9: {
        name: "香水百合",
        price: "198元",
        category: "百合 - 香水系列",
        description: "香水百合作为百合中的经典品种，花朵硕大饱满，花型优雅舒展，花瓣如白玉般温润细腻，自带馥郁清透的自然香气，芬芳不刺鼻。不同花色蕴含独特寓意：白色象征纯洁高雅、神圣无瑕；粉色代表浪漫温馨、甜蜜爱恋；黄色寓意阳光喜悦、友谊长存，既是节日送礼的心意之选，也是家居客厅、书房装饰的雅致搭配，能为空间增添浪漫氛围。",
        language: "高贵典雅、深深祝福、浪漫爱情、纯洁无瑕、温馨雅致",
        care: {
            "醒花": "收到花后立即去除花茎下部叶片（避免叶片浸泡腐烂），根部45度斜剪2-3cm，放入深水桶中深水醒花3-4小时，让花材充分吸水恢复活力",
            "修剪": "每次换水时，花茎底部再斜剪1cm；开花后及时摘除花蕊（尤其是黄色花粉部分），防止花粉沾染衣物或桌面造成污染",
            "水位": "采用中水位养护，水量约为花瓶高度的1/2，避免花茎基部浸泡过深导致腐烂",
            "换水": "每2天更换一次清水，换水时用清水冲洗花茎根部黏液，保持水质清洁；可加入鲜花保鲜剂延长花期",
            "特性": "香气浓郁持久，自然花期约7-10天（常温养护）；因香气较浓烈，避免放置在卧室、密闭空间，以免影响睡眠"
        },
        image: "https://p26-flow-imagex-download-sign.byteimg.com/tos-cn-i-a9rns2rl98/eeb10051898440bd826664dfcb82f307.jpg~tplv-a9rns2rl98-24:720:720.image?rcl=202512032159267C5724E46D9428BB4100&rk3s=8e244e95&rrcfp=8a172a1a&x-expires=1765375166&x-signature=FrzBxK5iHUscToMqGpFgDRrNJ3o%3D",
        tips: "挑选时优先选择花苞饱满、花茎挺拔无弯折、叶片翠绿有光泽的花材；避免与水果同放（水果释放的乙烯会加速花朵凋谢）"
    },
    10: {
        name: "满天星干花",
        price: 65,
        category: "干花",
        description: "满天星干花洁白小巧，花型蓬松轻盈，是极具装饰性的干花品种。搭配简约包装，可长期保存，适合点缀家居或作为伴手礼，传递纯粹的心意。干花采用自然晾晒工艺，保留了鲜花的原始形态与细腻质感，附赠'入目无别人，四下皆是你'主题贺卡，整体风格简约清新，充满文艺气息。",
        language: "纯粹的爱、思念、默默守护。它象征着默默无闻的陪伴与守护，寓意'你是我的全世界'，适合送给恋人、朋友或亲人，传递含蓄而深沉的情感。",
        care: [
            "醒花：干花无需醒花，拆开包装即可摆放",
            "修剪：根据摆放需求修剪过长花枝",
            "水位：无需加水，保持干燥环境",
            "保养：避免潮湿和阳光直射，定期轻扫灰尘",
            "特性：花期持久（1-2年），干燥后形态稳定"
        ],
        image: "https://p3-flow-imagex-download-sign.byteimg.com/tos-cn-i-a9rns2rl98/43eb08aec14a4b50b42feb01852ee6c6.jpg~tplv-a9rns2rl98-24:720:720.image?rcl=202512031728233931B41957A92E921AE6&rk3s=8e244e95&rrcfp=8a172a1a&x-expires=1765358903&x-signature=p6bmi9b2CzLb4Fv3PGICysYsjDE%3D",
        tips: "1. 干花属于天然制品，轻微掉花属于正常现象；2. 花束尺寸约25cm×15cm，贺卡可定制祝福语；3. 支持礼盒包装升级，适合节日送礼；4. 放置于通风干燥处可延长保存时间。"
    },
    11: {
        name: "芍药",
        price: 220,
        category: "芍药",
        description: "精选当季新鲜芍药花材，花型饱满如碗，花瓣层叠细腻，色彩娇艳动人。采用独特蝴蝶造型包装，搭配尤加利叶与尤加利果点缀，整体造型优雅大方。每束含8-10朵盛开芍药，附赠'情有独钟'主题贺卡，适合表达深沉而真挚的情感。花材源自优质种植基地，当日采摘配送，确保新鲜度与观赏期。",
        language: "情有独钟的爱、依依不舍、美丽动人。在中国传统文化中被誉为'花中宰相'，象征富贵吉祥与浪漫深情，既适合恋人之间表达专属爱意，也可用于重要纪念日传递眷恋之情。",
        care: [
            "醒花：收到后去除包装，斜剪花茎后深水醒花4-6小时",
            "修剪：保留顶部1-2片叶片，45度斜剪花茎3-5厘米",
            "水位：花瓶水位约为花茎长度的1/3，避免淹没花头",
            "保养：放置于凉爽通风处，避免阳光直射和空调直吹",
            "特性：花期约5-7天，温度较低环境可延长观赏期"
        ],
        image: "https://p26-flow-imagex-download-sign.byteimg.com/tos-cn-i-a9rns2rl98/290a6bc91f0e47b49e9dc472750825fa.jpg~tplv-a9rns2rl98-24:720:720.image?rcl=202512031730079B72E5357DC2F39B7063&rk3s=8e244e95&rrcfp=8a172a1a&x-expires=1765359007&x-signature=B%2F3jLRCE5We5FMAsNtfcjY52n5U%3D",
        tips: "1. 芍药花苞状态收到后会逐渐开放，绽放后花径可达10-15厘米；2. 花瓣若有轻微枯萎，可喷水保湿恢复活力；3. 支持定制包装色系，适合生日、纪念日等场景；4. 同城订单当日达，异地订单采用冷链保鲜运输。"
    },
    12: {
        name: "易塔玫瑰",
        price: 65,
        category: "干花",
        description: "易塔玫瑰干花形态优雅，花瓣层次丰富，是极具装饰性的干花品种。搭配简约包装，可长期保存，适合点缀家居或作为伴手礼，传递纯粹的心意。干花采用自然晾晒工艺，保留了鲜花的原始形态与细腻质感，附赠'入目无别人，四下皆是你'主题贺卡，整体风格简约清新，充满文艺气息。",
        language: "纯粹的爱、思念、默默守护。它象征着默默无闻的陪伴与守护，寓意'你是我的全世界'，适合送给恋人、朋友或亲人，传递含蓄而深沉的情感。",
        care: [
            "醒花：干花无需醒花，拆开包装即可摆放",
            "修剪：根据摆放需求修剪过长花枝",
            "水位：无需加水，保持干燥环境",
            "保养：避免潮湿和阳光直射，定期轻扫灰尘",
            "特性：花期持久（1-2年），干燥后形态稳定"
        ],
        image: "https://p26-flow-imagex-download-sign.byteimg.com/tos-cn-i-a9rns2rl98/0065c9d0361d4e228ebb54425b055305.jpg~tplv-a9rns2rl98-24:720:720.image?rcl=20251204091839F031D188269A1BAB3B6A&rk3s=8e244e95&rrcfp=8a172a1a&x-expires=1765415919&x-signature=L88cqb7XAmpFaku20xOWa0rIXbc%3D",
        tips: "1. 干花属于天然制品，轻微掉花属于正常现象；2. 花束尺寸约25cm×15cm，贺卡可定制祝福语；3. 支持礼盒包装升级，适合节日送礼；4. 放置于通风干燥处可延长保存时间。"
        }
    // 可以继续添加更多花卉数据
};

// 详情模态框加载逻辑（保持原样，只是移除了重复的部分）
document.addEventListener('DOMContentLoaded', function() {
    // ... 这里保持原有的详情模态框代码，不做修改 ...
    const detailButtons = document.querySelectorAll('.btn-detail');
    const detailModal = document.getElementById('detail-modal');
    const closeDetail = document.getElementById('close-detail');
    const detailImage = document.getElementById('detail-image');
    const detailName = document.getElementById('detail-name');
    const detailPrice = document.getElementById('detail-price');
    const detailCategory = document.getElementById('detail-category');
    const detailDescription = document.getElementById('detail-description');
    const detailLanguage = document.getElementById('detail-language');
    const detailCare = document.getElementById('detail-care');
    
    let currentFlowerId = null;
    
    detailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            currentFlowerId = this.getAttribute('data-id');
            const flower = flowerDetails[currentFlowerId];
            
            if (flower) {
                detailImage.innerHTML = `
                    <img src="${flower.image}" 
                         alt="${flower.name}" 
                         style="width: 100%; height: auto; object-fit: cover; border-radius: 8px;"/>
                `;
                
                detailName.textContent = flower.name;
                detailPrice.textContent = `¥${flower.price}`;
                detailCategory.textContent = `类别：${flower.category}`;
                detailDescription.textContent = flower.description;
                detailLanguage.textContent = flower.language;
                
                let careHtml = '';
                for (const [key, value] of Object.entries(flower.care)) {
                    careHtml += `<li><strong>${key}：</strong>${value}</li>`;
                }
                detailCare.innerHTML = careHtml;
                
                detailModal.style.display = 'block';
            }
        });
    });
    
    closeDetail.addEventListener('click', function() {
        detailModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === detailModal) {
            detailModal.style.display = 'none';
        }
    });
});

// ... 从这里开始保持所有其他函数的定义不变 ...
// 初始化默认用户数据
function initUserProfile(username) {
    // ... 保持原样 ...
    if (!userProfiles[username]) {
        userProfiles[username] = {
            firstName: '张',
            lastName: '三',
            displayName: username,
            email: username + '@example.com',
            phone: '13800138000',
            birthday: '1990-01-01',
            gender: 'male',
            bio: '热爱生活的花艺爱好者',
            avatarColor: getRandomColor(),
            regDate: new Date().toLocaleDateString('zh-CN'),
            lastLogin: new Date().toLocaleString('zh-CN')
        };
        localStorage.setItem('userProfiles', JSON.stringify(userProfiles));
    }
    if (!userAddresses[username]) {
        userAddresses[username] = [
            {
                id: 'addr1',
                name: '张三',
                phone: '13800138000',
                province: '上海市',
                city: '上海市',
                district: '静安区',
                detail: '南京西路123号浪漫大厦',
                postalCode: '200041',
                isDefault: true
            },
            {
                id: 'addr2',
                name: '张三',
                phone: '13900139000',
                province: '北京市',
                city: '北京市',
                district: '朝阳区',
                detail: '建国门外大街1号',
                postalCode: '100020',
                isDefault: false
            }
        ];
        localStorage.setItem('userAddresses', JSON.stringify(userAddresses));
    }
    if (!userFavorites[username]) {
        userFavorites[username] = ['1', '3', '5']; // 默认收藏的花卉ID
        localStorage.setItem('userFavorites', JSON.stringify(userFavorites));
    }
}

// 获取随机颜色（用于头像背景）
function getRandomColor() {
    const colors = [
        '#e94e6c', '#f5d1e3', '#ffb6c1', '#ff69b4', 
        '#db7093', '#ff1493', '#c71585', '#ff6eb4'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// 加载用户个人资料
function loadUserProfile() {
    if (!currentUser || !userLoggedIn) return;
    const profile = userProfiles[currentUser] || {};
    // 更新个人概况
    document.getElementById('profile-fullname').textContent = profile.displayName || currentUser;
    document.getElementById('profile-email').textContent = profile.email || currentUser + '@example.com';
    document.getElementById('profile-regdate').textContent = `注册时间: ${profile.regDate || '未知'}`;
    // 更新头像
    const avatarText = document.getElementById('avatar-text');
    const firstName = profile.firstName || '张';
    avatarText.textContent = firstName.charAt(0);
    const avatarDiv = document.getElementById('profile-avatar');
    avatarDiv.style.background = profile.avatarColor ? `linear-gradient(135deg, ${profile.avatarColor} 0%, ${darkenColor(profile.avatarColor, 20)} 100%)` : 
        'linear-gradient(135deg, #f5d1e3 0%, #e94e6c 100%)';
    // 更新购物统计
    updateShoppingStats();
    // 更新个人信息表单
    document.getElementById('profile-firstname').value = profile.firstName || '';
    document.getElementById('profile-lastname').value = profile.lastName || '';
    document.getElementById('profile-displayname').value = profile.displayName || currentUser;
    document.getElementById('profile-email-input').value = profile.email || currentUser + '@example.com';
    document.getElementById('profile-phone').value = profile.phone || '';
    document.getElementById('profile-birthday').value = profile.birthday || '';
    document.getElementById('profile-gender').value = profile.gender || '';
    document.getElementById('profile-bio').value = profile.bio || '';
}

// 颜色变暗函数
function darkenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return "#" + (
        0x1000000 +
        (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)
    ).toString(16).slice(1);
}

// 更新购物统计
function updateShoppingStats() {
    if (!currentUser || !userOrders[currentUser]) return;
    const orders = userOrders[currentUser] || [];
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
    const avgOrder = totalOrders > 0 ? totalSpent / totalOrders : 0;
    document.getElementById('total-orders').textContent = totalOrders;
    document.getElementById('total-spent').textContent = `¥${totalSpent.toFixed(2)}`;
    document.getElementById('avg-order').textContent = `¥${avgOrder.toFixed(2)}`;
    document.getElementById('total-orders-count').textContent = totalOrders;
    // 更新会员等级和积分
    updateMembershipInfo(totalSpent, totalOrders);
}

// 更新会员等级信息
function updateMembershipInfo(totalSpent, totalOrders) {
    const points = Math.floor(totalSpent); // 1元=1积分
    // 会员等级规则
    let level = '普通会员';
    let nextLevelPoints = 1000;
    let progress = 0;
    if (points >= 5000) {
        level = '钻石会员';
        nextLevelPoints = 10000;
        progress = 100;
    } else if (points >= 2000) {
        level = '金牌会员';
        nextLevelPoints = 5000;
        progress = ((points - 2000) / 3000) * 100;
    } else if (points >= 1000) {
        level = '银牌会员';
        nextLevelPoints = 2000;
        progress = ((points - 1000) / 1000) * 100;
    } else {
        progress = (points / 1000) * 100;
    }
    document.getElementById('membership-level').textContent = level;
    document.getElementById('membership-title').textContent = level;
    document.getElementById('membership-desc').textContent = getMembershipDescription(level);
    document.getElementById('current-points').textContent = points;
    document.getElementById('next-level-points').textContent = nextLevelPoints;
    document.getElementById('profile-level').textContent = `会员等级: ${level}`;
    // 更新进度条
    const progressBar = document.getElementById('membership-progress-bar');
    progressBar.style.width = `${Math.min(progress, 100)}%`;
}

// 获取会员等级描述
function getMembershipDescription(level) {
    switch(level) {
        case '钻石会员':
            return '享受85折优惠，优先配送，专属客服';
        case '金牌会员':
            return '享受9折优惠，生日专属礼遇';
        case '银牌会员':
            return '享受95折优惠，积分加倍';
        default:
            return '继续消费可升级为更高级别会员，享受更多优惠';
    }
}

// 加载用户地址
function loadUserAddresses() {
    if (!currentUser || !userLoggedIn) return;
    const addresses = userAddresses[currentUser] || [];
    const addressList = document.getElementById('address-list');
    if (addresses.length === 0) {
        addressList.innerHTML = '<div class="empty-orders"><p>暂无收货地址</p><p>点击下方按钮添加地址</p></div>';
        return;
    }
    addressList.innerHTML = '';
    addresses.forEach(address => {
        const addressCard = document.createElement('div');
        addressCard.className = `address-card ${address.isDefault ? 'default' : ''}`;
        addressCard.dataset.id = address.id;
        addressCard.innerHTML = `
            <div class="address-header">
                <div>
                    <span class="address-name">${address.name}</span>
                    ${address.isDefault ? '<span class="address-tag">默认</span>' : ''}
                </div>
                <div class="address-actions">
                    <button class="address-action-btn edit-address-btn" data-id="${address.id}">编辑</button>
                    <button class="address-action-btn delete-address-btn" data-id="${address.id}">删除</button>
                </div>
            </div>
            <div class="address-content">
                <div>${address.province}${address.city}${address.district}${address.detail}</div>
                <div class="address-phone">${address.phone}</div>
                <div>邮编: ${address.postalCode}</div>
            </div>
            ${!address.isDefault ? 
                `<div style="text-align: right;">
                    <button class="address-action-btn set-default-btn" data-id="${address.id}">设为默认</button>
                </div>` : ''
            }
        `;
        addressList.appendChild(addressCard);
    });
}

// 加载用户收藏
function loadUserFavorites() {
    if (!currentUser || !userLoggedIn) return;
    const favorites = userFavorites[currentUser] || [];
    const favoritesList = document.getElementById('favorites-list');
    const emptyFavorites = document.getElementById('empty-favorites');
    if (favorites.length === 0) {
        favoritesList.innerHTML = '';
        emptyFavorites.style.display = 'block';
        return;
    }
    emptyFavorites.style.display = 'none';
    favoritesList.innerHTML = '';
    favorites.forEach(flowerId => {
        const flower = flowerDetails[flowerId];
        if (!flower) return;
        const favoriteItem = document.createElement('div');
        favoriteItem.className = 'favorite-item';
        favoriteItem.dataset.id = flowerId;
        favoriteItem.innerHTML = `
            <div class="favorite-image" style="background-image: url('${flower.image}')">
                <div class="favorite-remove" data-id="${flowerId}">×</div>
            </div>
            <div class="favorite-info">
                <div class="favorite-name">${flower.name}</div>
                <div class="favorite-price">¥${flower.price}</div>
                <div class="favorite-actions">
                    <button class="favorite-action-btn view-favorite-btn" data-id="${flowerId}">查看详情</button>
                    <button class="favorite-action-btn buy-favorite-btn" data-id="${flowerId}">立即购买</button>
                </div>
            </div>
        `;
        favoritesList.appendChild(favoriteItem);
    });
}

// 加载最近订单（个人中心简化版）
function loadRecentOrders() {
    if (!currentUser || !userLoggedIn) return;
    const orders = userOrders[currentUser] || [];
    const recentOrders = orders.slice(0, 3); // 只显示最近的3个订单
    const orderList = document.getElementById('profile-order-list');
    if (recentOrders.length === 0) {
        orderList.innerHTML = '<div class="empty-orders"><p>暂无订单</p><p>快去选购心仪的花卉吧！</p></div>';
        return;
    }
    orderList.innerHTML = '';
    recentOrders.forEach(order => {
        // 状态显示文本
        let statusText = '';
        let statusClass = '';
        switch(order.status) {
            case 'pending':
                statusText = '待付款';
                statusClass = 'pending';
                break;
            case 'processing':
                statusText = '处理中';
                statusClass = 'processing';
                break;
            case 'shipped':
                statusText = '已发货';
                statusClass = 'shipped';
                break;
            case 'delivered':
                statusText = '已完成';
                statusClass = 'delivered';
                break;
            case 'cancelled':
                statusText = '已取消';
                statusClass = 'cancelled';
                break;
        }
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div class="order-header-info">
                <div>
                    <div class="order-id">${order.id}</div>
                    <div class="order-date">${order.date}</div>
                </div>
                <span class="order-status ${statusClass}">${statusText}</span>
            </div>
            <div class="order-details">
                <div>订单包含 ${order.items.reduce((sum, item) => sum + item.quantity, 0)} 件商品</div>
                <div class="order-total">总计：¥${order.total.toFixed(2)}</div>
            </div>
            <div class="order-summary">
                <div class="order-actions">
                    <button class="view-order-btn" data-order-id="${order.id}">查看详情</button>
                </div>
            </div>
        `;
        orderList.appendChild(orderItem);
    });
}

// 切换个人中心部分
function switchProfileSection(sectionId) {
    currentProfileSection = sectionId;
    // 更新菜单项状态
    document.querySelectorAll('.profile-menu-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === sectionId) {
            item.classList.add('active');
        }
    });
    // 显示对应的内容部分
    document.querySelectorAll('.profile-section').forEach(section => {
        section.classList.remove('active');
        if (section.id === `profile-${sectionId}`) {
            section.classList.add('active');
        }
    });
    // 加载特定部分的数据
    switch(sectionId) {
        case 'address':
            loadUserAddresses();
            break;
        case 'favorites':
            loadUserFavorites();
            break;
        case 'orders':
            loadRecentOrders();
            break;
    }
}

// 显示个人中心
function showProfile() {
    if (!userLoggedIn) {
        showNotification('请先登录后再查看个人中心！');
        document.getElementById('login-modal').classList.add('show');
        return;
    }
    document.getElementById('profile-modal').classList.add('show');
    loadUserProfile();
    switchProfileSection('overview');
}

// 花卉收藏功能
class FavoriteManager {
    constructor() {
        this.favorites = this.loadFavorites();
        this.init();
    }

    // 初始化收藏功能
    init() {
        this.bindEvents();
        this.updateFavoriteButtons();
        this.renderFavorites();
        this.updateFavoriteCountInHeader();
    }

    // 绑定事件
    bindEvents() {
        // 收藏按钮点击事件
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-favorite')) {
                const button = e.target.closest('.btn-favorite');
                const flowerId = button.getAttribute('data-id');
                const flowerName = button.getAttribute('data-name');
                const flowerPrice = button.getAttribute('data-price');
                
                this.toggleFavorite(flowerId, flowerName, flowerPrice);
                e.preventDefault();
            }

            // 从收藏中移除
            if (e.target.closest('.remove-favorite')) {
                const button = e.target.closest('.remove-favorite');
                const flowerId = button.getAttribute('data-id');
                this.removeFavorite(flowerId);
                e.preventDefault();
            }

            // 从收藏中购买
            if (e.target.closest('.buy-from-favorite')) {
                const button = e.target.closest('.buy-from-favorite');
                const flowerId = button.getAttribute('data-id');
                const flowerName = button.getAttribute('data-name');
                const flowerPrice = button.getAttribute('data-price');
                
                this.buyFromFavorite(flowerId, flowerName, flowerPrice);
                e.preventDefault();
            }
            
            // 从收藏中查看详情
            if (e.target.closest('.view-favorite-btn')) {
                const button = e.target.closest('.view-favorite-btn');
                const flowerId = button.getAttribute('data-id');
                this.viewFromFavorite(flowerId);
                e.preventDefault();
            }
            
            // 从收藏中移除（个人中心）
            if (e.target.closest('.favorite-remove')) {
                const button = e.target.closest('.favorite-remove');
                const flowerId = button.getAttribute('data-id');
                this.removeFavorite(flowerId);
                e.preventDefault();
            }
        });

        // 个人中心收藏菜单项点击
        document.addEventListener('click', (e) => {
            if (e.target.closest('.profile-menu-item[data-section="favorites"]')) {
                this.renderFavorites();
            }
        });
    }

    // 加载收藏数据
    loadFavorites() {
        if (!currentUser || !userLoggedIn) return {};
        
        const favorites = {};
        const userFavList = userFavorites[currentUser] || [];
        
        userFavList.forEach(flowerId => {
            const flower = flowerDetails[flowerId];
            if (flower) {
                favorites[flowerId] = {
                    id: flowerId,
                    name: flower.name,
                    price: parseFloat(flower.price),
                    dateAdded: new Date().toISOString(),
                    image: flower.image
                };
            }
        });
        
        return favorites;
    }

    // 保存收藏数据
    saveFavorites() {
        if (!currentUser || !userLoggedIn) return;
        
        const favoriteIds = Object.keys(this.favorites);
        userFavorites[currentUser] = favoriteIds;
        localStorage.setItem('userFavorites', JSON.stringify(userFavorites));
    }

    // 切换收藏状态
    toggleFavorite(id, name, price) {
        if (!userLoggedIn) {
            showNotification('请先登录后再收藏花卉！');
            document.getElementById('login-modal').classList.add('show');
            return;
        }
        
        if (this.favorites[id]) {
            // 如果已经收藏，则移除
            delete this.favorites[id];
            this.showMessage('已从收藏中移除', 'success');
        } else {
            // 添加到收藏
            this.favorites[id] = {
                id,
                name,
                price: parseFloat(price),
                dateAdded: new Date().toISOString(),
                image: this.getFlowerImage(id)
            };
            this.showMessage('已添加到收藏', 'success');
        }
        
        this.saveFavorites();
        this.updateFavoriteButtons();
        this.renderFavorites();
        this.updateFavoriteCountInHeader();
    }

    // 从收藏中移除
    removeFavorite(id) {
        if (this.favorites[id]) {
            delete this.favorites[id];
            this.saveFavorites();
            this.updateFavoriteButtons();
            this.renderFavorites();
            this.updateFavoriteCountInHeader();
            this.showMessage('已从收藏中移除', 'success');
        }
    }

    // 从收藏中购买
    buyFromFavorite(id, name, price) {
        // 添加到购物车
        addToCart(name, parseFloat(price));
        
        // 关闭个人中心模态框（如果打开的话）
        const profileModal = document.getElementById('profile-modal');
        if (profileModal.style.display === 'block') {
            profileModal.style.display = 'none';
        }
        
        // 显示购物车
        document.getElementById('cart-modal').classList.add('show');
        
        this.showMessage('已添加到购物车', 'success');
    }
    
    // 从收藏中查看详情
    viewFromFavorite(id) {
        showFlowerDetail(id);
        
        // 关闭个人中心模态框（如果打开的话）
        const profileModal = document.getElementById('profile-modal');
        if (profileModal.style.display === 'block') {
            profileModal.style.display = 'none';
        }
    }

    // 更新所有收藏按钮状态
    updateFavoriteButtons() {
        const favoriteButtons = document.querySelectorAll('.btn-favorite');
        favoriteButtons.forEach(button => {
            const flowerId = button.getAttribute('data-id');
            if (this.favorites[flowerId]) {
                button.classList.add('active');
                button.querySelector('.favorite-icon').textContent = '❤️';
                button.querySelector('.favorite-text').textContent = '已收藏';
            } else {
                button.classList.remove('active');
                button.querySelector('.favorite-icon').textContent = '🤍';
                button.querySelector('.favorite-text').textContent = '收藏';
            }
        });
    }

    // 渲染收藏列表
    renderFavorites() {
        const favoritesList = document.getElementById('favorites-list');
        const emptyFavorites = document.getElementById('empty-favorites');
        
        if (!favoritesList) return;
        
        // 获取收藏的花卉ID数组
        const favoriteIds = Object.keys(this.favorites);
        
        if (favoriteIds.length === 0) {
            favoritesList.innerHTML = '';
            if (emptyFavorites) {
                emptyFavorites.style.display = 'block';
            }
            return;
        }
        
        if (emptyFavorites) {
            emptyFavorites.style.display = 'none';
        }
        
        // 生成收藏列表HTML
        let html = '';
        favoriteIds.forEach(id => {
            const flower = this.favorites[id];
            html += `
                <div class="favorite-card" data-id="${flower.id}">
                    <div class="favorite-img" style="background-image: url('${flower.image}')"></div>
                    <div class="favorite-content">
                        <h3 class="favorite-name">${flower.name}</h3>
                        <div class="favorite-price">¥${flower.price}</div>
                        <div class="favorite-actions">
                            <button class="remove-favorite" data-id="${flower.id}">移除收藏</button>
                            <button class="buy-from-favorite" 
                                    data-id="${flower.id}"
                                    data-name="${flower.name}"
                                    data-price="${flower.price}">立即购买</button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        favoritesList.innerHTML = html;
    }

    // 获取花卉图片
    getFlowerImage(id) {
        return flowerDetails[id]?.image || "image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMDAgMjAwIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y1ZDFlMyIvPjxjaXJjbGUgY3g9IjE1MCIgY3k9IjEwMCIgcj0iNjAiIGZpbGw9IiNmOGM0ZDYiLz48L3N2Zz4=";
    }

    // 显示消息提示
    showMessage(message, type = 'success') {
        // 创建消息元素
        const messageEl = document.createElement('div');
        messageEl.className = `favorite-message favorite-message-${type}`;
        messageEl.textContent = message;
        
        // 样式
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#ff6b6b'};
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            font-size: 14px;
        `;
        
        // 添加到页面
        document.body.appendChild(messageEl);
        
        // 3秒后移除
        setTimeout(() => {
            messageEl.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.parentNode.removeChild(messageEl);
                }
            }, 300);
        }, 3000);
    }

    // 获取收藏数量
    getFavoriteCount() {
        return Object.keys(this.favorites).length;
    }
    
    // 更新用户状态栏的收藏数量显示
    updateFavoriteCountInHeader() {
        const favoriteCount = this.getFavoriteCount();
        const userStatus = document.getElementById('user-status');
        
        if (!userStatus) return;
        
        // 创建或更新收藏数量显示
        let favoriteCountEl = document.getElementById('favorite-count');
        if (!favoriteCountEl && userStatus) {
            favoriteCountEl = document.createElement('div');
            favoriteCountEl.id = 'favorite-count';
            favoriteCountEl.className = 'favorite-count-header';
            favoriteCountEl.innerHTML = `
                <span class="favorite-icon">❤️</span>
                <span class="favorite-count">${favoriteCount}</span>
            `;
            
            // 插入到用户状态区域
            userStatus.insertBefore(favoriteCountEl, userStatus.firstChild);
            
            // 添加点击事件，跳转到收藏页面
            favoriteCountEl.addEventListener('click', (e) => {
                e.preventDefault();
                // 打开个人中心并切换到收藏页面
                showProfile();
                
                // 切换到收藏页面
                setTimeout(() => {
                    const favoritesMenuItem = document.querySelector('.profile-menu-item[data-section="favorites"]');
                    if (favoritesMenuItem) {
                        favoritesMenuItem.click();
                    }
                }, 100);
            });
        } else if (favoriteCountEl) {
            const countSpan = favoriteCountEl.querySelector('.favorite-count');
            if (countSpan) {
                countSpan.textContent = favoriteCount;
            }
        }
    }
}

// 更新花卉卡片，添加收藏按钮
function updateFlowerCardsWithFavorites() {
    const flowerCards = document.querySelectorAll('.flower-card');
    
    flowerCards.forEach(card => {
        const flowerId = card.querySelector('.btn-detail')?.getAttribute('data-id');
        const flowerName = card.querySelector('.flower-name')?.textContent;
        const flowerPrice = card.querySelector('.flower-price')?.textContent.replace('¥', '');
        
        if (flowerId && flowerName && flowerPrice) {
            const actionsDiv = card.querySelector('.flower-actions');
            if (actionsDiv) {
                // 检查是否已经存在收藏按钮
                if (!actionsDiv.querySelector('.btn-favorite')) {
                    const favoriteBtn = document.createElement('button');
                    favoriteBtn.className = 'btn btn-favorite';
                    favoriteBtn.setAttribute('data-id', flowerId);
                    favoriteBtn.setAttribute('data-name', flowerName);
                    favoriteBtn.setAttribute('data-price', flowerPrice);
                    favoriteBtn.innerHTML = `
                        <span class="favorite-icon">🤍</span>
                        <span class="favorite-text">收藏</span>
                    `;
                    
                    // 插入到操作按钮中
                    actionsDiv.appendChild(favoriteBtn);
                }
            }
        }
    });
}

// 在详情模态框中也添加收藏按钮
function updateDetailModalWithFavorite() {
    const detailModal = document.getElementById('detail-modal');
    if (!detailModal) return;
    
    const detailActions = detailModal.querySelector('.detail-actions');
    if (!detailActions) return;
    
    // 获取当前详情的花卉信息
    const flowerId = currentFlowerId;
    const flowerName = detailModal.querySelector('.detail-name')?.textContent;
    const flowerPrice = detailModal.querySelector('.detail-price')?.textContent.replace('¥', '');
    
    if (flowerId && flowerName && flowerPrice) {
        // 检查是否已经存在收藏按钮
        if (!detailActions.querySelector('.detail-btn-favorite')) {
            const favoriteBtn = document.createElement('button');
            favoriteBtn.className = 'detail-btn detail-btn-favorite';
            favoriteBtn.setAttribute('data-id', flowerId);
            favoriteBtn.setAttribute('data-name', flowerName);
            favoriteBtn.setAttribute('data-price', flowerPrice);
            favoriteBtn.innerHTML = `
                <span class="favorite-icon">🤍</span>
                <span>收藏</span>
            `;
            
            // 插入到操作按钮中
            detailActions.insertBefore(favoriteBtn, detailActions.firstChild);
            
            // 更新收藏按钮状态
            if (favoriteManager) {
                const isFavorite = favoriteManager.favorites[flowerId];
                if (isFavorite) {
                    favoriteBtn.classList.add('active');
                    favoriteBtn.querySelector('.favorite-icon').textContent = '❤️';
                    favoriteBtn.innerHTML = `
                        <span class="favorite-icon">❤️</span>
                        <span>已收藏</span>
                    `;
                }
            }
        }
    }
}

// 轮播图功能
const bannerSlides = document.getElementById('banner-slides');
const bannerDots = document.querySelectorAll('.banner-dot');
let currentSlide = 0;
const totalSlides = bannerDots.length;
function showSlide(slideIndex) {
    bannerSlides.style.transform = `translateX(-${slideIndex * 100}%)`;
    bannerDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });
    currentSlide = slideIndex;
}
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}
// 自动轮播
let slideInterval = setInterval(nextSlide, 4000);
// 手动控制轮播
bannerDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(index);
        slideInterval = setInterval(nextSlide, 4000);
    });
});

// 购物车功能
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price: parseFloat(price), quantity: 1 });
    }
    updateCart();
    showNotification(`${name} 已加入购物车！`);
}
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCart();
}
function updateQuantity(name, change) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(name);
        } else {
            updateCart();
        }
    }
}
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const totalAmount = document.getElementById('total-amount');
    const cartCount = document.getElementById('cart-count');
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">购物车为空</div>';
        cartTotal.style.display = 'none';
    } else {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const subtotal = item.price * item.quantity;
            total += subtotal;
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div>
                    <div>${item.name}</div>
                    <div>¥${item.price}</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-name="${item.name}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increase" data-name="${item.name}">+</button>
                    <span style="margin-left: 10px; color: #e94e6c;">¥${subtotal.toFixed(2)}</span>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
        totalAmount.textContent = total.toFixed(2);
        cartTotal.style.display = 'flex';
    }
    // 绑定事件
    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', (e) => {
            const name = e.target.dataset.name;
            updateQuantity(name, -1);
        });
    });
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', (e) => {
            const name = e.target.dataset.name;
            updateQuantity(name, 1);
        });
    });
}

// 订单管理功能
function createOrder(cartItems, totalAmount, userInfo) {
    if (!currentUser || !userLoggedIn) {
        showNotification('请先登录后再下单！');
        return false;
    }
    const orderId = 'ORDER-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    const orderDate = new Date().toLocaleString('zh-CN');
    // 生成订单状态时间线
    const timeline = [
        { status: 'pending', date: orderDate, description: '订单已创建，等待付款' },
        { status: 'processing', date: getFutureDate(1), description: '订单已确认，准备发货' },
        { status: 'shipped', date: getFutureDate(2), description: '订单已发货，正在运输中' },
        { status: 'delivered', date: getFutureDate(3), description: '订单已送达，等待确认收货' }
    ];
    const order = {
        id: orderId,
        date: orderDate,
        status: 'pending',
        items: cartItems.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            subtotal: item.price * item.quantity
        })),
        total: totalAmount,
        timeline: timeline,
        shippingAddress: userInfo.shippingAddress || '上海市静安区南京西路123号',
        paymentMethod: userInfo.paymentMethod || '在线支付',
        contactPhone: userInfo.contactPhone || '13800138000',
        note: userInfo.note || ''
    };
    // 保存订单到用户订单列表
    if (!userOrders[currentUser]) {
        userOrders[currentUser] = [];
    }
    userOrders[currentUser].unshift(order);
    localStorage.setItem('userOrders', JSON.stringify(userOrders));
    // 清空购物车
    cart = [];
    updateCart();
    // 更新个人中心的购物统计
    updateShoppingStats();
    return orderId;
}
function getFutureDate(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleString('zh-CN');
}
function updateOrderStatus(orderId, newStatus) {
    if (!currentUser || !userOrders[currentUser]) return false;
    const orderIndex = userOrders[currentUser].findIndex(order => order.id === orderId);
    if (orderIndex !== -1) {
        userOrders[currentUser][orderIndex].status = newStatus;
        localStorage.setItem('userOrders', JSON.stringify(userOrders));
        // 添加状态更新到时间线
        const updateDate = new Date().toLocaleString('zh-CN');
        let updateDescription = '';
        switch(newStatus) {
            case 'processing':
                updateDescription = '订单已确认，准备发货';
                break;
            case 'shipped':
                updateDescription = '订单已发货，正在运输中';
                break;
            case 'delivered':
                updateDescription = '订单已完成，感谢您的购买';
                break;
            case 'cancelled':
                updateDescription = '订单已取消';
                break;
        }
        if (updateDescription) {
            userOrders[currentUser][orderIndex].timeline.push({
                status: newStatus,
                date: updateDate,
                description: updateDescription
            });
        }
        // 更新个人中心的购物统计
        updateShoppingStats();
        return true;
    }
    return false;
}
function getUserOrders(status = 'all') {
    if (!currentUser || !userOrders[currentUser]) {
        return [];
    }
    if (status === 'all') {
        return userOrders[currentUser];
    }
    return userOrders[currentUser].filter(order => order.status === status);
}
function renderOrders(orders) {
    const orderContainer = document.getElementById('order-content-container');
    const emptyOrders = document.getElementById('empty-orders');
    if (!orders || orders.length === 0) {
        orderContainer.innerHTML = `
            <div class="empty-orders">
                <p>暂无订单</p>
                <p>快去选购心仪的花卉吧！</p>
            </div>
        `;
        return;
    }
    orderContainer.innerHTML = '';
    orders.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.className = 'order-item';
        // 计算订单项总数
        const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
        // 状态显示文本
        let statusText = '';
        let statusClass = '';
        switch(order.status) {
            case 'pending':
                statusText = '待付款';
                statusClass = 'pending';
                break;
            case 'processing':
                statusText = '处理中';
                statusClass = 'processing';
                break;
            case 'shipped':
                statusText = '已发货';
                statusClass = 'shipped';
                break;
            case 'delivered':
                statusText = '已完成';
                statusClass = 'delivered';
                break;
            case 'cancelled':
                statusText = '已取消';
                statusClass = 'cancelled';
                break;
        }
        // 订单项列表
        const itemsHtml = order.items.map(item => `
            <div class="order-item-row">
                <div class="order-item-name">${item.name}</div>
                <div class="order-item-quantity">× ${item.quantity}</div>
                <div class="order-item-price">¥${item.subtotal.toFixed(2)}</div>
            </div>
        `).join('');
        // 时间线显示
        const timelineHtml = order.timeline.map((step, index) => {
            let dotClass = '';
            let isActive = false;
            let isCompleted = false;
            if (step.status === order.status) {
                isActive = true;
            } else if (index < order.timeline.findIndex(s => s.status === order.status)) {
                isCompleted = true;
            }
            if (isActive) dotClass = 'active';
            if (isCompleted) dotClass = 'completed';
            return `
                <div class="timeline-item">
                    <div class="timeline-dot ${dotClass}"></div>
                    <div class="timeline-content">
                        <div>${step.description}</div>
                        <div class="timeline-date">${step.date}</div>
                    </div>
                </div>
            `;
        }).join('');
        // 可用的操作按钮
        let actionButtons = '';
        switch(order.status) {
            case 'pending':
                actionButtons = `
                    <button class="order-action-btn pay-btn" data-order-id="${order.id}">立即付款</button>
                    <button class="order-action-btn cancel-btn" data-order-id="${order.id}">取消订单</button>
                `;
                break;
            case 'processing':
                actionButtons = `
                    <button class="order-action-btn" disabled>等待发货</button>
                `;
                break;
            case 'shipped':
                actionButtons = `
                    <button class="order-action-btn confirm-btn" data-order-id="${order.id}">确认收货</button>
                `;
                break;
            case 'delivered':
                actionButtons = `
                    <button class="order-action-btn review-btn" data-order-id="${order.id}">评价订单</button>
                    <button class="order-action-btn reorder-btn" data-order-id="${order.id}">再次购买</button>
                `;
                break;
            case 'cancelled':
                actionButtons = `
                    <button class="order-action-btn delete-btn" data-order-id="${order.id}">删除订单</button>
                `;
                break;
        }
        orderElement.innerHTML = `
            <div class="order-header-info">
                <div>
                    <div class="order-id">${order.id}</div>
                    <div class="order-date">${order.date}</div>
                </div>
                <span class="order-status ${statusClass}">${statusText}</span>
            </div>
            <div class="order-details">
                <div>订单包含 ${totalItems} 件商品</div>
                <div class="order-item-list">
                    ${itemsHtml}
                </div>
            </div>
            <div class="order-total">总计：¥${order.total.toFixed(2)}</div>
            <div class="order-status-timeline">
                <h4>订单进度</h4>
                ${timelineHtml}
            </div>
            <div class="order-info-section">
                <h4>订单信息</h4>
                <div class="order-info-row">
                    <div class="order-info-label">收货地址：</div>
                    <div class="order-info-value">${order.shippingAddress}</div>
                </div>
                <div class="order-info-row">
                    <div class="order-info-label">联系电话：</div>
                    <div class="order-info-value">${order.contactPhone}</div>
                </div>
                <div class="order-info-row">
                    <div class="order-info-label">支付方式：</div>
                    <div class="order-info-value">${order.paymentMethod}</div>
                </div>
                ${order.note ? `
                    <div class="order-info-row">
                        <div class="order-info-label">订单备注：</div>
                        <div class="order-info-value">${order.note}</div>
                    </div>
                ` : ''}
            </div>
            <div class="order-summary">
                <div class="order-actions">
                    ${actionButtons}
                    <button class="view-order-btn" data-order-id="${order.id}">查看详情</button>
                </div>
            </div>
        `;
        orderContainer.appendChild(orderElement);
    });
    // 绑定订单操作事件
    bindOrderActions();
}
function bindOrderActions() {
    // 付款按钮
    document.querySelectorAll('.pay-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const orderId = e.target.dataset.orderId;
            if (confirm(`确认支付订单 ${orderId} 吗？`)) {
                updateOrderStatus(orderId, 'processing');
                showNotification('付款成功！订单已进入处理阶段。');
                renderOrders(getUserOrders(currentOrderStatus));
            }
        });
    });
    // 取消订单按钮
    document.querySelectorAll('.cancel-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const orderId = e.target.dataset.orderId;
            if (confirm(`确定要取消订单 ${orderId} 吗？`)) {
                updateOrderStatus(orderId, 'cancelled');
                showNotification('订单已取消！');
                renderOrders(getUserOrders(currentOrderStatus));
            }
        });
    });
    // 确认收货按钮
    document.querySelectorAll('.confirm-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const orderId = e.target.dataset.orderId;
            if (confirm(`确认收到订单 ${orderId} 的商品吗？`)) {
                updateOrderStatus(orderId, 'delivered');
                showNotification('收货确认成功！感谢您的购买。');
                renderOrders(getUserOrders(currentOrderStatus));
            }
        });
    });
    // 评价订单按钮
    document.querySelectorAll('.review-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const orderId = e.target.dataset.orderId;
            const review = prompt('请为本次购物体验评分（1-5星）并留下评价：');
            if (review) {
                showNotification('评价提交成功！感谢您的反馈。');
            }
        });
    });
    // 再次购买按钮
    document.querySelectorAll('.reorder-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const orderId = e.target.dataset.orderId;
            const order = userOrders[currentUser].find(o => o.id === orderId);
            if (order) {
                order.items.forEach(item => {
                    addToCart(item.name, item.price);
                });
                showNotification('商品已加入购物车！');
            }
        });
    });
    // 删除订单按钮
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const orderId = e.target.dataset.orderId;
            if (confirm(`确定要删除订单 ${orderId} 吗？此操作不可恢复。`)) {
                userOrders[currentUser] = userOrders[currentUser].filter(order => order.id !== orderId);
                localStorage.setItem('userOrders', JSON.stringify(userOrders));
                showNotification('订单已删除！');
                renderOrders(getUserOrders(currentOrderStatus));
            }
        });
    });
    // 查看详情按钮
    document.querySelectorAll('.view-order-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const orderId = e.target.dataset.orderId;
            const order = userOrders[currentUser].find(o => o.id === orderId);
            if (order) {
                alert(`订单详情：
订单号：${order.id}
下单时间：${order.date}
订单状态：${order.status}
订单总额：¥${order.total.toFixed(2)}
商品数量：${order.items.reduce((sum, item) => sum + item.quantity, 0)}
收货地址：${order.shippingAddress}`);
            }
        });
    });
}
function filterOrdersByStatus(status) {
    currentOrderStatus = status;
    const orders = getUserOrders(status);
    renderOrders(orders);
    // 更新标签页状态
    document.querySelectorAll('.order-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.status === status);
    });
}

// 通知提示
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #e94e6c;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 分类筛选
function filterProducts(category) {
    const products = document.querySelectorAll('.flower-card');
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.filter-btn[data-category="${category}"]`).classList.add('active');
}

// 页面滚动
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// 登录相关
function showLoginMessage(message, type) {
    const messageDiv = document.getElementById('login-message');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.classList.add('show');
    setTimeout(() => {
        messageDiv.classList.remove('show');
    }, 5000);
}
function loginUser(username) {
    userLoggedIn = true;
    currentUser = username;
    initUserProfile(username);
    document.getElementById('user-name').textContent = username;
    document.getElementById('user-name').title = '点击进入个人中心';
    document.getElementById('user-status').style.display = 'flex';
    document.getElementById('login-btn').style.display = 'none';
    document.getElementById('login-modal').classList.remove('show');
    showNotification(`欢迎回来，${username}！`);
    
    // 初始化收藏管理器
    if (favoriteManager) {
        favoriteManager.favorites = favoriteManager.loadFavorites();
        favoriteManager.updateFavoriteButtons();
        favoriteManager.renderFavorites();
        favoriteManager.updateFavoriteCountInHeader();
    }
}
function logoutUser() {
    userLoggedIn = false;
    currentUser = '';
    document.getElementById('user-name').textContent = '';
    document.getElementById('user-name').title = '';
    document.getElementById('user-status').style.display = 'none';
    document.getElementById('login-btn').style.display = 'block';
    localStorage.removeItem('rememberMe');
    localStorage.removeItem('username');
    sessionStorage.removeItem('username');
    document.getElementById('order-modal').classList.remove('show');
    document.getElementById('profile-modal').classList.remove('show');
    showNotification('您已成功退出登录');
    
    // 清空收藏管理器
    if (favoriteManager) {
        favoriteManager.favorites = {};
        favoriteManager.updateFavoriteButtons();
        favoriteManager.updateFavoriteCountInHeader();
    }
}
function checkLoginStatus() {
    const rememberMe = localStorage.getItem('rememberMe');
    const savedUsername = localStorage.getItem('username') || sessionStorage.getItem('username');
    if (rememberMe === 'true' && savedUsername) {
        loginUser(savedUsername);
    }
}

// 花卉详情
function showFlowerDetail(flowerId) {
    const detail = flowerDetails[flowerId];
    if (!detail) return;
    currentFlowerId = flowerId;
    document.getElementById('detail-name').textContent = detail.name;
    document.getElementById('detail-price').textContent = `¥${detail.price}`;
    document.getElementById('detail-category').textContent = detail.category;
    document.getElementById('detail-description').textContent = detail.description;
    document.getElementById('detail-language').textContent = detail.language;
    document.getElementById('detail-image').style.backgroundImage = `url('${detail.image}')`;
    const careList = document.getElementById('detail-care');
    careList.innerHTML = '';
    for (const [key, value] of Object.entries(detail.care)) {
        const li = document.createElement('li');
        li.innerHTML = `<span class="care-label">${key}:</span><span class="care-value">${value}</span>`;
        careList.appendChild(li);
    }
    document.getElementById('detail-modal').classList.add('show');
    
    // 更新详情模态框的收藏按钮
    updateDetailModalWithFavorite();
}

// 搜索功能
function performSearch(query) {
    const resultsDiv = document.getElementById('search-results');
    resultsDiv.innerHTML = '';
    if (!query.trim()) {
        resultsDiv.classList.remove('show');
        return;
    }
    if (searchHistory.length >= 10) {
        searchHistory.pop();
    }
    searchHistory = searchHistory.filter(item => item.toLowerCase() !== query.toLowerCase());
    searchHistory.unshift(query);
    localStorage.setItem('flowerSearchHistory', JSON.stringify(searchHistory));
    updateSearchHistory();
    const searchTerm = query.toLowerCase();
    const results = [];
    for (const [id, flower] of Object.entries(flowerDetails)) {
        const matchName = flower.name.toLowerCase().includes(searchTerm);
        const matchCategory = flower.category.toLowerCase().includes(searchTerm);
        const matchLanguage = flower.language.toLowerCase().includes(searchTerm);
        const matchDescription = flower.description.toLowerCase().includes(searchTerm);
        if (matchName || matchCategory || matchLanguage || matchDescription) {
            results.push({ id, ...flower });
        }
    }
    if (results.length > 0) {
        results.forEach(flower => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.setAttribute('data-id', flower.id);
            resultItem.innerHTML = `
                <div class="search-result-image" style="background-image: url('${flower.image}')"></div>
                <div class="search-result-info">
                    <div class="search-result-name">${flower.name}</div>
                    <div class="search-result-category">${flower.category}</div>
                    <div class="search-result-price">¥${flower.price}</div>
                    <div class="search-result-actions">
                        <button class="search-result-btn search-detail-btn" data-id="${flower.id}">查看详情</button>
                        <button class="search-result-btn search-buy-btn" data-name="${flower.name}" data-price="${flower.price}">加入购物车</button>
                    </div>
                </div>
            `;
            resultsDiv.appendChild(resultItem);
        });
        resultsDiv.querySelectorAll('.search-detail-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const flowerId = button.dataset.id;
                showFlowerDetail(flowerId);
                resultsDiv.classList.remove('show');
            });
        });
        resultsDiv.querySelectorAll('.search-buy-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const name = button.dataset.name;
                const price = button.dataset.price;
                addToCart(name, price);
                resultsDiv.classList.remove('show');
            });
        });
        resultsDiv.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.search-result-actions')) {
                    const flowerId = item.dataset.id;
                    showFlowerDetail(flowerId);
                    resultsDiv.classList.remove('show');
                }
            });
        });
        resultsDiv.classList.add('show');
    } else {
        resultsDiv.innerHTML = '<div class="no-results">未找到匹配的花卉，请尝试其他关键词。</div>';
        resultsDiv.classList.add('show');
    }
}
function updateSearchHistory() {
    const historySection = document.getElementById('search-history-section');
    if (!historySection) return;
    historySection.innerHTML = '';
    if (searchHistory.length > 0) {
        const historyTitle = document.createElement('h4');
        historyTitle.textContent = '搜索历史：';
        historySection.appendChild(historyTitle);
        const historyList = document.createElement('div');
        historyList.className = 'search-history';
        searchHistory.slice(0, 5).forEach(term => {
            const historyItem = document.createElement('span');
            historyItem.className = 'search-history-item';
            historyItem.textContent = term;
            historyItem.addEventListener('click', () => {
                document.getElementById('search-input').value = term;
                performSearch(term);
            });
            historyList.appendChild(historyItem);
        });
        historySection.appendChild(historyList);
    }
}

// DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();

    // 初始化收藏管理器
    favoriteManager = new FavoriteManager();
    
    // 更新花卉卡片，添加收藏按钮
    updateFlowerCardsWithFavorites();

    // 导航
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.dataset.target;
            scrollToSection(target);
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    document.getElementById('contact-link').addEventListener('click', function(e) {
        e.preventDefault();
        scrollToSection('contact');
    });

    // 商品操作
    document.querySelectorAll('.btn-buy').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            addToCart(this.dataset.name, this.dataset.price);
        });
    });
    document.querySelectorAll('.btn-detail').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showFlowerDetail(this.dataset.id);
        });
    });

    // 分类筛选
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            filterProducts(button.dataset.category);
        });
    });

    // 购物车
    document.getElementById('cart-icon').addEventListener('click', () => {
        document.getElementById('cart-modal').classList.add('show');
    });
    document.getElementById('close-cart').addEventListener('click', () => {
        document.getElementById('cart-modal').classList.remove('show');
    });
    document.getElementById('cart-modal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            e.currentTarget.classList.remove('show');
        }
    });
    document.getElementById('checkout-btn').addEventListener('click', function() {
        if (cart.length > 0) {
            if (!userLoggedIn) {
                showNotification('请先登录后再结算！');
                document.getElementById('cart-modal').classList.remove('show');
                document.getElementById('login-modal').classList.add('show');
                return;
            }
            const shippingAddress = prompt('请输入收货地址（默认为上海静安区）：', '上海市静安区南京西路123号');
            const contactPhone = prompt('请输入联系电话：', '13800138000');
            const note = prompt('请输入订单备注（可选）：', '');
            const userInfo = {
                shippingAddress: shippingAddress || '上海市静安区南京西路123号',
                contactPhone: contactPhone || '13800138000',
                note: note || ''
            };
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const orderId = createOrder(cart, total, userInfo);
            if (orderId) {
                alert(`订单提交成功！
订单号：${orderId}
订单总额：¥${total.toFixed(2)}
我们将在2小时内为您配送！`);
                document.getElementById('cart-modal').classList.remove('show');
                showNotification('订单创建成功！您可以在"我的订单"中查看详情。');
            }
        }
    });

    // 登录
    document.getElementById('login-btn').addEventListener('click', () => {
        document.getElementById('login-modal').classList.add('show');
    });
    document.getElementById('close-login').addEventListener('click', () => {
        document.getElementById('login-modal').classList.remove('show');
    });
    document.getElementById('login-modal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            e.currentTarget.classList.remove('show');
        }
    });
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value.trim();
        const remember = document.getElementById('login-remember').checked;
        if (!username || !password) {
            showLoginMessage('请输入用户名和密码', 'error');
            return;
        }
        showLoginMessage('正在登录，请稍候...', 'success');
        setTimeout(() => {
            if (username && password.length >= 6) {
                if (remember) {
                    localStorage.setItem('rememberMe', 'true');
                    localStorage.setItem('username', username);
                } else {
                    sessionStorage.setItem('username', username);
                }
                loginUser(username);
            } else {
                showLoginMessage('用户名或密码错误，请重试', 'error');
            }
        }, 1000);
    });
    document.getElementById('forgot-password').addEventListener('click', function(e) {
        e.preventDefault();
        const username = prompt('请输入您的用户名或注册邮箱，我们将发送密码重置链接：');
        if (username) {
            showLoginMessage(`密码重置链接已发送到 ${username} 关联的邮箱，请查收。`, 'success');
        }
    });
    document.getElementById('register-link').addEventListener('click', function(e) {
        e.preventDefault();
        showLoginMessage('注册功能即将上线，敬请期待！', 'success');
    });
    document.getElementById('wechat-login').addEventListener('click', function() {
        showLoginMessage('微信登录功能正在开发中，敬请期待！', 'success');
    });
    document.getElementById('qq-login').addEventListener('click', function() {
        showLoginMessage('QQ登录功能正在开发中，敬请期待！', 'success');
    });
    document.getElementById('logout-btn').addEventListener('click', function() {
        logoutUser();
    });

    // 订单
    document.getElementById('view-orders-btn').addEventListener('click', function(e) {
        e.preventDefault();
        if (!userLoggedIn) {
            showNotification('请先登录后再查看订单！');
            document.getElementById('login-modal').classList.add('show');
            return;
        }
        document.getElementById('order-modal').classList.add('show');
        filterOrdersByStatus('all');
    });
    document.getElementById('close-order').addEventListener('click', () => {
        document.getElementById('order-modal').classList.remove('show');
    });
    document.getElementById('order-modal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            e.currentTarget.classList.remove('show');
        }
    });
    document.querySelectorAll('.order-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const status = this.dataset.status;
            filterOrdersByStatus(status);
        });
    });

    // 个人中心
    document.getElementById('user-name').addEventListener('click', function(e) {
        e.preventDefault();
        showProfile();
    });
    document.getElementById('close-profile').addEventListener('click', () => {
        document.getElementById('profile-modal').classList.remove('show');
    });
    document.getElementById('profile-modal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            e.currentTarget.classList.remove('show');
        }
    });
    document.querySelectorAll('.profile-menu-item').forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.dataset.section;
            switchProfileSection(sectionId);
        });
    });
    
    // 浏览花卉按钮点击事件
    document.addEventListener('click', (e) => {
        if (e.target.closest('#browse-flowers-btn')) {
            // 关闭个人中心模态框
            const profileModal = document.getElementById('profile-modal');
            if (profileModal.style.display === 'block' || profileModal.classList.contains('show')) {
                profileModal.classList.remove('show');
            }
            
            // 滚动到花卉展示区域
            const flowersSection = document.getElementById('flowers');
            if (flowersSection) {
                flowersSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            e.preventDefault();
        }
    });
    
    document.getElementById('profile-form').addEventListener('submit', function(e) {
        e.preventDefault();
        if (!currentUser || !userLoggedIn) return;
        const profileData = {
            firstName: document.getElementById('profile-firstname').value.trim(),
            lastName: document.getElementById('profile-lastname').value.trim(),
            displayName: document.getElementById('profile-displayname').value.trim() || currentUser,
            email: document.getElementById('profile-email-input').value.trim(),
            phone: document.getElementById('profile-phone').value.trim(),
            birthday: document.getElementById('profile-birthday').value,
            gender: document.getElementById('profile-gender').value,
            bio: document.getElementById('profile-bio').value.trim()
        };
        if (!profileData.displayName) {
            showProfileMessage('显示名称不能为空', 'error');
            return;
        }
        userProfiles[currentUser] = {
            ...userProfiles[currentUser],
            ...profileData
        };
        localStorage.setItem('userProfiles', JSON.stringify(userProfiles));
        loadUserProfile();
        showProfileMessage('个人信息更新成功！', 'success');
        switchProfileSection('overview');
    });
    document.getElementById('cancel-profile').addEventListener('click', function() {
        loadUserProfile();
        switchProfileSection('overview');
    });
    document.getElementById('add-address-btn').addEventListener('click', function() {
        const newAddress = {
            id: 'addr' + Date.now(),
            name: userProfiles[currentUser]?.displayName || currentUser,
            phone: userProfiles[currentUser]?.phone || '13800138000',
            province: '上海市',
            city: '上海市',
            district: '静安区',
            detail: '请输入详细地址',
            postalCode: '200041',
            isDefault: userAddresses[currentUser]?.length === 0
        };
        const addresses = userAddresses[currentUser] || [];
        addresses.push(newAddress);
        userAddresses[currentUser] = addresses;
        localStorage.setItem('userAddresses', JSON.stringify(userAddresses));
        loadUserAddresses();
        showProfileMessage('地址添加成功！请编辑地址信息。', 'success');
    });
    document.getElementById('address-list').addEventListener('click', function(e) {
        const target = e.target;
        const addressId = target.dataset.id;
        if (target.classList.contains('edit-address-btn')) {
            editAddress(addressId);
        } else if (target.classList.contains('delete-address-btn')) {
            deleteAddress(addressId);
        } else if (target.classList.contains('set-default-btn')) {
            setDefaultAddress(addressId);
        }
    });
    function editAddress(addressId) {
        const addresses = userAddresses[currentUser] || [];
        const address = addresses.find(addr => addr.id === addressId);
        if (!address) return;
        const newName = prompt('请输入收货人姓名：', address.name);
        if (newName === null) return;
        const newPhone = prompt('请输入联系电话：', address.phone);
        if (newPhone === null) return;
        const newDetail = prompt('请输入详细地址：', address.detail);
        if (newDetail === null) return;
        address.name = newName;
        address.phone = newPhone;
        address.detail = newDetail;
        localStorage.setItem('userAddresses', JSON.stringify(userAddresses));
        loadUserAddresses();
        showProfileMessage('地址修改成功！', 'success');
    }
    function deleteAddress(addressId) {
        if (!confirm('确定要删除这个地址吗？')) return;
        const addresses = userAddresses[currentUser] || [];
        const filteredAddresses = addresses.filter(addr => addr.id !== addressId);
        const deletedAddress = addresses.find(addr => addr.id === addressId);
        if (deletedAddress?.isDefault && filteredAddresses.length > 0) {
            filteredAddresses[0].isDefault = true;
        }
        userAddresses[currentUser] = filteredAddresses;
        localStorage.setItem('userAddresses', JSON.stringify(userAddresses));
        loadUserAddresses();
        showProfileMessage('地址删除成功！', 'success');
    }
    function setDefaultAddress(addressId) {
        const addresses = userAddresses[currentUser] || [];
        addresses.forEach(addr => {
            addr.isDefault = addr.id === addressId;
        });
        localStorage.setItem('userAddresses', JSON.stringify(userAddresses));
        loadUserAddresses();
        showProfileMessage('默认地址设置成功！', 'success');
    }
    document.getElementById('favorites-list').addEventListener('click', function(e) {
        const target = e.target;
        const flowerId = target.dataset.id;
        if (target.classList.contains('favorite-remove')) {
            removeFromFavorites(flowerId);
        } else if (target.classList.contains('view-favorite-btn')) {
            showFlowerDetail(flowerId);
            document.getElementById('profile-modal').classList.remove('show');
        } else if (target.classList.contains('buy-favorite-btn')) {
            const flower = flowerDetails[flowerId];
            if (flower) {
                addToCart(flower.name, flower.price);
                document.getElementById('profile-modal').classList.remove('show');
            }
        }
    });
    function removeFromFavorites(flowerId) {
        if (!confirm('确定要从收藏中移除吗？')) return;
        const favorites = userFavorites[currentUser] || [];
        const filteredFavorites = favorites.filter(id => id !== flowerId);
        userFavorites[currentUser] = filteredFavorites;
        localStorage.setItem('userFavorites', JSON.stringify(userFavorites));
        loadUserFavorites();
        showProfileMessage('已从收藏中移除！', 'success');
        
        // 更新收藏管理器
        if (favoriteManager) {
            delete favoriteManager.favorites[flowerId];
            favoriteManager.updateFavoriteButtons();
            favoriteManager.updateFavoriteCountInHeader();
        }
    }
    document.getElementById('change-password-btn').addEventListener('click', function() {
        const oldPassword = prompt('请输入旧密码：');
        if (!oldPassword) return;
        const newPassword = prompt('请输入新密码（至少6位）：');
        if (!newPassword || newPassword.length < 6) {
            alert('密码长度至少6位！');
            return;
        }
        const confirmPassword = prompt('请确认新密码：');
        if (newPassword !== confirmPassword) {
            alert('两次输入的密码不一致！');
            return;
        }
        showProfileMessage('密码修改成功！', 'success');
    });
    document.getElementById('view-all-orders-btn').addEventListener('click', function() {
        document.getElementById('profile-modal').classList.remove('show');
        document.getElementById('order-modal').classList.add('show');
        filterOrdersByStatus('all');
    });
    function showProfileMessage(message, type) {
        const messageDiv = document.getElementById('profile-message');
        messageDiv.textContent = message;
        messageDiv.className = `message ${type}`;
        messageDiv.classList.add('show');
        setTimeout(() => {
            messageDiv.classList.remove('show');
        }, 3000);
    }

    // 花卉详情模态框
    document.getElementById('close-detail').addEventListener('click', () => {
        document.getElementById('detail-modal').classList.remove('show');
    });
    document.getElementById('detail-modal').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            e.currentTarget.classList.remove('show');
        }
    });
    document.getElementById('detail-add-cart').addEventListener('click', () => {
        if (currentFlowerId) {
            const detail = flowerDetails[currentFlowerId];
            if (detail) {
                addToCart(detail.name, detail.price);
                document.getElementById('detail-modal').classList.remove('show');
            }
        }
    });
    document.getElementById('detail-buy-now').addEventListener('click', () => {
        if (currentFlowerId) {
            const detail = flowerDetails[currentFlowerId];
            if (detail) {
                addToCart(detail.name, detail.price);
                document.getElementById('detail-modal').classList.remove('show');
                document.getElementById('cart-modal').classList.add('show');
            }
        }
    });
    
    // 详情模态框收藏按钮点击事件
    document.addEventListener('click', (e) => {
        if (e.target.closest('.detail-btn-favorite')) {
            const button = e.target.closest('.detail-btn-favorite');
            const flowerId = button.getAttribute('data-id');
            const flowerName = button.getAttribute('data-name');
            const flowerPrice = button.getAttribute('data-price');
            
            if (favoriteManager) {
                favoriteManager.toggleFavorite(flowerId, flowerName, flowerPrice);
                
                // 更新详情模态框中的收藏按钮状态
                if (favoriteManager.favorites[flowerId]) {
                    button.classList.add('active');
                    button.querySelector('.favorite-icon').textContent = '❤️';
                    button.innerHTML = `
                        <span class="favorite-icon">❤️</span>
                        <span>已收藏</span>
                    `;
                } else {
                    button.classList.remove('active');
                    button.querySelector('.favorite-icon').textContent = '🤍';
                    button.innerHTML = `
                        <span class="favorite-icon">🤍</span>
                        <span>收藏</span>
                    `;
                }
            }
        }
    });

    // 搜索
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchResults = document.getElementById('search-results');
    const searchHint = document.getElementById('search-hint');
    const searchHintClose = document.getElementById('search-hint-close');
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) performSearch(query);
    });
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) performSearch(query);
        }
    });
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        const query = searchInput.value.trim();
        if (query.length === 0) {
            searchResults.classList.remove('show');
            return;
        }
        searchTimeout = setTimeout(() => performSearch(query), 300);
    });
    searchInput.addEventListener('focus', () => {
        searchHint.classList.add('show');
        updateSearchHistory();
    });
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            searchResults.classList.remove('show');
            searchHint.classList.remove('show');
        }
    });
    if (searchHintClose) {
        searchHintClose.addEventListener('click', () => {
            searchHint.classList.remove('show');
        });
    }
    const clearHistoryBtn = document.getElementById('clear-history');
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', () => {
            searchHistory = [];
            localStorage.removeItem('flowerSearchHistory');
            updateSearchHistory();
            showNotification('搜索历史已清除');
        });
    }
    updateSearchHistory();

    // 轮播图悬停暂停
    const banner = document.querySelector('.banner');
    banner.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    banner.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 4000);
    });

    // 初始化
    updateCart();
    
    // 为现有的收藏按钮添加CSS动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .favorite-count-header {
            display: flex;
            align-items: center;
            gap: 5px;
            background: linear-gradient(135deg, #ffc8dd, #ffafcc);
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 14px;
        }
        
        .favorite-count-header:hover {
            background: linear-gradient(135deg, #ffafcc, #ff8fab);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(255, 175, 204, 0.4);
        }
        
        .favorite-count-header .favorite-icon {
            font-size: 16px;
        }
        
        .favorite-count-header .favorite-count {
            font-weight: 600;
        }
        
        .detail-btn-favorite {
            background: linear-gradient(135deg, #ffc8dd, #ffafcc);
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        
        .detail-btn-favorite:hover {
            background: linear-gradient(135deg, #ffafcc, #ff8fab);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(255, 175, 204, 0.4);
        }
        
        .detail-btn-favorite.active {
            background: linear-gradient(135deg, #ff8fab, #fb6f92);
        }
    `;
    document.head.appendChild(style);
});