export interface VIItem {
  id: number;
  category: string;
  subcategory: string;
  name: string;
  content: string;
  images: string[];
  specs: string;
  material: string;
  remark: string;
}

export const viData: VIItem[] = [
  {
    id: 1,
    category: "环境导视类",
    subcategory: "园区导视",
    name: "公告栏 (60*50)",
    content: "设计园区公告栏版式，统一Logo、配色，规范内容排版",
    specs: "60cm*50cm",
    material: "亚克力/雪弗板",
    remark: "底部白条尺寸为更换企业信息位置",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 2,
    category: "环境导视类",
    subcategory: "园区导视",
    name: "公告栏 (80*50)",
    content: "设计园区公告栏版式，统一Logo、配色，规范内容排版",
    specs: "80cm*50cm",
    material: "亚克力/雪弗板",
    remark: "底部白条尺寸为更换企业信息位置",
    images: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 3,
    category: "宣传展示类",
    subcategory: "活动宣传",
    name: "活动海报",
    content: "设计活动海报、通知海报、消防宣传海报、文明宣传海报的统一版式规范",
    specs: "常规规格",
    material: "铜版纸/喷绘",
    remark: "",
    images: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 4,
    category: "宣传展示类",
    subcategory: "活动宣传",
    name: "易拉宝/X展架",
    content: "设计易拉宝、X展架版式，适配企业宣传、活动推广、园区通知",
    specs: "80cm*200cm / 60cm*160cm",
    material: "相纸/PP胶",
    remark: "",
    images: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 5,
    category: "宣传展示类",
    subcategory: "活动宣传",
    name: "横幅/条幅",
    content: "明确横幅/条幅的字体、配色、Logo摆放位置，规范文字排版",
    specs: "按需定制",
    material: "涤纶布/喷绘布",
    remark: "",
    images: [
      "https://images.unsplash.com/photo-1503387762-592dee58c160?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 6,
    category: "环境导视类",
    subcategory: "园区导视",
    name: "楼栋/单元牌",
    content: "设计楼栋牌、单元牌、楼层牌、房号牌",
    specs: "按需定制",
    material: "铝板/亚克力",
    remark: "",
    images: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1582408921715-18e7806367c1?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 7,
    category: "环境导视类",
    subcategory: "设备标识",
    name: "机房/设备标识",
    content: "设计机房名称牌、设备标识、管道流向标识、责任人巡检牌",
    specs: "按需定制",
    material: "PVC/不锈钢",
    remark: "",
    images: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 8,
    category: "功能提示类",
    subcategory: "服务提示",
    name: "门禁/服务提示",
    content: "设计单元门推/拉提示标识、出门按钮提示、门禁刷卡区提示、物业24小时服务热线、投诉监督电话公示",
    specs: "按需定制",
    material: "亚克力/背胶",
    remark: "",
    images: [
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 9,
    category: "规章制度公示类",
    subcategory: "管理制度",
    name: "公示牌",
    content: "物业服务收费标准公示、物业服务人员行为规范、业主报事报修流程、装修管理规定、宠物管理规定、停车管理规定、消防安全管理规定、高空抛物禁止规定",
    specs: "按需定制",
    material: "铝合金框/亚克力",
    remark: "",
    images: [
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 10,
    category: "安全警示标识类",
    subcategory: "安全警示",
    name: "警示标识",
    content: "小心地滑、小心碰头、小心台阶、小心跌落、高空坠物警示、禁止攀爬、禁止翻越、高压危险、弱电井警示、禁止嬉水、禁止垂钓、监控覆盖提示、禁止吸烟、易燃易爆警示、施工围挡警示",
    specs: "按需定制",
    material: "反光膜/铝板",
    remark: "强制合规",
    images: [
      "https://images.unsplash.com/photo-1590079019458-0eb5b40a3371?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 11,
    category: "消防安防标识类",
    subcategory: "消防标识",
    name: "消防标识",
    content: "灭火器/消防栓点位标识、消防疏散示意图（每层）、消防通道标识、防火门标识（常闭防火门）、消防水泵房/消防控制室标识、安防监控室标识、微型消防站标识",
    specs: "按需定制",
    material: "夜光/PVC",
    remark: "必检项",
    images: [
      "https://images.unsplash.com/photo-1599700403969-f77b3aa74837?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1516533075015-a3838414c3cb?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 12,
    category: "办公事务类",
    subcategory: "表单文档",
    name: "常用表单",
    content: "设计报事报修单、物业费收费单、园区巡查表、员工考勤表等常用表单",
    specs: "A4/三联单",
    material: "无碳复写纸",
    remark: "",
    images: [
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1586281380349-631531a744c2?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 13,
    category: "办公事务类",
    subcategory: "表单文档",
    name: "合同封面",
    content: "设计物业服务合同、装修协议、租赁协议等合同封面及页眉样式",
    specs: "A4",
    material: "皮纹纸/特种纸",
    remark: "",
    images: [
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 14,
    category: "办公事务类",
    subcategory: "表单文档",
    name: "档案管理",
    content: "设计文件夹封面、档案盒标签，统一样式、字体，标注文件分类",
    specs: "按需定制",
    material: "不干胶/纸质",
    remark: "",
    images: [
      "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 15,
    category: "宣传展示类",
    subcategory: "办公宣传",
    name: "PPT母版",
    content: "设计PPT封面、目录页、内页、图表页、结束页母版，统一Logo、配色、字体",
    specs: "16:9",
    material: "电子版",
    remark: "",
    images: [
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 16,
    category: "宣传展示类",
    subcategory: "办公宣传",
    name: "手册画册",
    content: "设计企业介绍册、物业服务手册、招商手册版式，统一内页风格、排版规范",
    specs: "210mm*285mm",
    material: "铜版纸",
    remark: "",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 17,
    category: "办公事务类",
    subcategory: "表单文档",
    name: "word竖版",
    content: "Word标准模板",
    specs: "A4",
    material: "电子版",
    remark: "",
    images: [
      "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 18,
    category: "办公事务类",
    subcategory: "表单文档",
    name: "Excel表单",
    content: "Excel表单模板",
    specs: "A4",
    material: "电子版",
    remark: "",
    images: [
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 19,
    category: "宣传展示类",
    subcategory: "办公宣传",
    name: "PPT母版模板",
    content: "PPT母版模板设计",
    specs: "16:9",
    material: "电子版",
    remark: "",
    images: [
      "https://images.unsplash.com/photo-1558403194-611308249627?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 20,
    category: "其他",
    subcategory: "大转盘",
    name: "大转盘宣传",
    content: "1-7日每月大转盘通用宣传",
    specs: "B5",
    material: "带背胶",
    remark: "",
    images: [
      "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 21,
    category: "其他",
    subcategory: "大转盘",
    name: "大转盘宣传(多层)",
    content: "1-7日每月大转盘通用宣传多层",
    specs: "B5",
    material: "带背胶",
    remark: "",
    images: [
      "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 22,
    category: "其他",
    subcategory: "大转盘",
    name: "大转盘宣传(高层)",
    content: "1-7日每月大转盘通用宣传高层",
    specs: "B5",
    material: "带背胶",
    remark: "",
    images: [
      "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 23,
    category: "其他",
    subcategory: "智能服务",
    name: "手机开门",
    content: "手机开门宣传",
    specs: "A4",
    material: "带背胶",
    remark: "",
    images: [
      "https://images.unsplash.com/photo-1563911191470-39721c03c21b?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: 24,
    category: "其他",
    subcategory: "智能服务",
    name: "手机开门(含收费)",
    content: "手机开门（含收费）宣传",
    specs: "A4",
    material: "带背胶",
    remark: "",
    images: [
      "https://images.unsplash.com/photo-1563911191470-39721c03c21b?auto=format&fit=crop&q=80&w=800"
    ]
  }
];
