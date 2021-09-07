export const RESPONSE_TYPE_SHORT_ANSWER = 'SHORT_ANSWER'
export const RESPONSE_TYPE_MULTI_CHOICE = 'MULTI_CHOICE'
export const RESPONSE_TYPE_CHECKBOXES = 'CHECKBOXES'
export const RESPONSE_TYPE_PRIORITIZATION = 'PRIORITIZATION'
export const RESPONSE_TYPE_LONG_ANSWER = 'LONG_ANSWER'

export const SERVER_ANSWERS_TYPES = {
  [RESPONSE_TYPE_SHORT_ANSWER]: 'ans_t',
  [RESPONSE_TYPE_MULTI_CHOICE]: 'ans_o',
  [RESPONSE_TYPE_CHECKBOXES]: 'ans_m',
  [RESPONSE_TYPE_PRIORITIZATION]: 'ans_r',
  [RESPONSE_TYPE_LONG_ANSWER]: 'ans_t',
}

export const SECTION_GENERAL_INFORMATION = 'general-information'

export const SECTION_KNOWLEDGE_SOURCE_AND_LEARNING_STYLE =
  'knowledge-source-and-learning-style'

export const SECTION_GENZ_LIFESTYLE_IN_PRESENT_PART_1 =
  'genz-lifestyle-in-present-part-1'
export const SECTION_GENZ_LIFESTYLE_IN_PRESENT_PART_2 =
  'genz-lifestyle-in-present-part-2'

export const SECTION_GENZ_LIFE_EXPECTANCY_PART_1 = 'genz-life-expectancy-part-1'
export const SECTION_GENZ_LIFE_EXPECTANCY_PART_2 = 'genz-life-expectancy-part-2'

export const SECTION_FEEDBACK = 'feedback'

export const SECTION_DISPLAY_INDEX = {
  [SECTION_GENERAL_INFORMATION]: '1',
  [SECTION_KNOWLEDGE_SOURCE_AND_LEARNING_STYLE]: '2',
  [SECTION_GENZ_LIFESTYLE_IN_PRESENT_PART_1]: '3.1',
  [SECTION_GENZ_LIFESTYLE_IN_PRESENT_PART_2]: '3.2',
  [SECTION_GENZ_LIFE_EXPECTANCY_PART_1]: '4.1',
  [SECTION_GENZ_LIFE_EXPECTANCY_PART_2]: '4.2',
  [SECTION_FEEDBACK]: '5',
}

export const SERVER_SECTION_IDS = {
  [SECTION_GENERAL_INFORMATION]: 'sec1',
  [SECTION_KNOWLEDGE_SOURCE_AND_LEARNING_STYLE]: 'sec2',
  [SECTION_GENZ_LIFESTYLE_IN_PRESENT_PART_1]: 'sec3_1',
  [SECTION_GENZ_LIFESTYLE_IN_PRESENT_PART_2]: 'sec3_2',
  [SECTION_GENZ_LIFE_EXPECTANCY_PART_1]: 'sec4_1',
  [SECTION_GENZ_LIFE_EXPECTANCY_PART_2]: 'sec4_2',
  [SECTION_FEEDBACK]: 'sec5',
}

export const SECTIONS = {
  [SECTION_GENERAL_INFORMATION]: {
    id: 1,
    title: 'ข้อมูลทั่วไป',
    questions: [
      {
        type: RESPONSE_TYPE_SHORT_ANSWER,
        title: 'อายุ',
        description: 'ใส่ช่วงอายุ Gen Z ระหว่าง 16 – 26 ปี เท่านั้น',
        placeholder: 'โปรดระบุอายุของท่าน',
        inputTypeForDOM: 'number',
      },
      {
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title: 'โปรดระบุเพศ',
        options: [{title: 'ชาย'}, {title: 'หญิง'}, {title: 'ไม่ระบุ'}],
      },
      {
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title: 'ข้อมูลด้านสถานภาพ',
        options: [
          {
            title: 'ยังไม่ได้รับวุฒิการศึกษาระดับปริญญาตรีหรือเทียบเท่า',
            registeringGroups: ['A'],
          },
          {
            title: 'กำลังศึกษาอยู่ในระดับปริญญาตรี',
            registeringGroups: ['B'],
          },
          {
            title: 'สำเร็จการศึกษาระดับปริญญาตรีแล้ว',
            registeringGroups: ['C', 'D'],
          },
        ],
      },
      {
        showForGroups: ['A'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title: 'โปรดระบุระดับที่กำลังศึกษาอยู่ในปัจจุบัน',
        options: [
          {title: 'มัธยมศึกษาตอนปลาย หรือเทียบเท่า'},
          {title: 'อาชีวศึกษา (ปวช. / ปวส.)'},
          {title: 'ไม่ได้ศึกษาอยู่ในระดับใด'},
        ],
      },
      {
        showForGroups: ['B'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title: 'ท่านศึกษาหลักสูตรในกลุ่มสาขาวิชาใด',
        options: [
          {title: 'มนุษยศาสตร์และสังคมศาสตร์'},
          {title: 'วิทยาศาสตร์และเทคโนโลยี'},
          {title: 'วิทยาศาสตร์สุขภาพ'},
        ],
      },
      {
        showForGroups: ['C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title: 'สำเร็จการศึกษาระดับปริญญาตรีแล้ว',
        options: [
          {
            title: 'กำลังศึกษาระดับบัณฑิตศึกษา',
            registeringGroups: ['C'],
          },
          {
            title: 'ไม่ได้ศึกษาต่อในระดับบัณฑิตศึกษา',
            registeringGroups: ['D'],
          },
        ],
      },
      {
        showForGroups: ['C', 'D'],
        type: RESPONSE_TYPE_CHECKBOXES,
        title: 'สำเร็จการศึกษาระดับปริญญาตรี และประกอบอาชีพ',
        description: 'เลือกได้มากกว่า  1 ข้อ',
        options: [
          {title: 'ข้าราชการ/เจ้าหน้าที่หรือพนักงานของรัฐ'},
          {title: 'พนักงานรัฐวิสาหกิจ'},
          {title: 'พนักงานเอกชน'},
          {title: 'ธุรกิจส่วนตัว'},
          {title: 'ประกอบอาชีพอิสระ (Freelance)'},
          {title: 'ว่างงาน'},
          {
            type: 'SHORT_ANSWER',
          },
        ],
      },
      {
        showForGroups: ['C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title: 'รายได้ต่อเดือน',
        options: [
          {title: 'ต่ำกว่า 10,000 บาท'},
          {title: '10,001–20,000 บาท'},
          {title: '20,001–30,000 บาท'},
          {title: '30,001–40,000 บาท'},
          {title: '40,001–50,000 บาท'},
          {title: 'มากกว่า 50,000 บาท'},
        ],
      },
    ],
  },
  [SECTION_KNOWLEDGE_SOURCE_AND_LEARNING_STYLE]: {
    id: 2,
    title: 'แหล่งความรู้และรูปแบบการเรียนรู้',
    questions: [
      {
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_CHECKBOXES,
        title: 'ท่านค้นคว้าหาความรู้จากแหล่งใด',
        description: 'เลือกได้มากกว่า 1 ข้อ',
        options: [
          {title: 'Facebook '},
          {title: 'YouTube '},
          {title: 'Twitter '},
          {title: 'Line '},
          {title: 'Tik Tok '},
          {title: 'Instagram '},
          {title: 'Podcast'},
          {title: 'MOOC'},
          {title: 'วิทยุ'},
          {title: 'โทรทัศน์'},
          {title: 'Website'},
          {title: 'สื่อสิ่งพิมพ์ เช่น หนังสือ ตำรา นิตยสาร วารสาร'},
          {title: 'บุคคล เช่น ครู อาจารย์ พ่อแม่ ปราชญ์ ผู้รู้ ผู้เชี่ยวชาญ'},
          {
            type: 'SHORT_ANSWER',
          },
        ],
      },
      {
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_CHECKBOXES,
        title:
          'ท่านได้รับข่าวสารการประชาสัมพันธ์หลักสูตร/การอบรมเพื่อพัฒนาตนเองจากแหล่งใด',
        description: 'เลือกได้มากกว่า 1 ข้อ',
        options: [
          {title: 'Facebook '},
          {title: 'YouTube '},
          {title: 'Twitter '},
          {title: 'Line '},
          {title: 'Tik Tok '},
          {title: 'Instagram '},
          {title: 'Podcast'},
          {
            title:
              'Website ของหน่วยงาน เช่น สถาบันจัดการศึกษาทั้งภาครัฐและเอกชน',
          },
          {
            title:
              'การบอกกล่าวจากบุคคล เช่น ครูแนะแนว รุ่นพี่ เพื่อนร่วมงาน บุคคลใกล้ชิด',
          },
          {
            title:
              'สื่อสิ่งพิมพ์ เช่น แผ่นพับ ใบปลิว หนังสือพิมพ์ นิตยสาร วารสาร',
          },
          {title: 'ป้ายประชาสัมพันธ์ขนาดใหญ่ (billboard)'},
          {title: 'ป้ายกองโจร (cutout)'},
          {title: 'วิทยุ'},
          {title: 'โทรทัศน์'},
          {
            type: 'SHORT_ANSWER',
          },
        ],
      },
      {
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_PRIORITIZATION,
        title: 'ท่านชอบการเรียนในรูปแบบใด',
        description:
          'โปรดเรียงลำดับความสำคัญ โดย 1 = ชอบมากที่สุด 6 = ชอบน้อยที่สุด',
        options: [
          {title: 'เรียนในห้องเรียน (on-site)'},
          {
            title:
              'เรียนออนไลน์ตามเวลาที่กำหนดในสถานที่ใดก็ได้ (live) เช่น ผ่าน Zoom, Google meets, webinar',
          },
          {
            title:
              'เรียนออนไลน์ที่สามารถเรียนในวันเวลาและสถานที่ใดก็ได้ (streaming) เช่น Coursera, MOOC',
          },
          {title: 'เรียนแบบผสมผสาน (hybrid) ทั้งในห้องเรียนและเรียนออนไลน์'},
          {title: 'เรียนแบบการลงมือปฏิบัติจริง (workshop/case study)'},
          {
            title:
              'เรียนแบบมีพี่เลี้ยง หรือผู้เชี่ยวชาญเฉพาะด้านให้คำแนะนำ (coaching)',
          },
        ],
      },
      {
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title: 'นอกเหนือจากปริญญา ท่านมีเป้าหมายใดในการพัฒนาตนเอง',
        options: [
          {title: 'เพื่อให้ได้รับใบประกาศนียบัตร เช่น ใบรับรองสมรรถนะ'},
          {title: 'เพื่อสะสมหน่วยกิตไว้สำหรับการศึกษาเพื่อปริญญา'},
          {title: 'เพื่อสร้างเครือข่ายความสัมพันธ์ (connection)'},
          {title: 'เพื่อเรียนรู้ในสิ่งที่ไม่มีสอนในชั้นเรียนหรือหลักสูตรปกติ'},
        ],
      },
      {
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title:
          'ค่าใช้จ่ายที่ท่านสามารถชำระได้สำหรับหลักสูตรนอกเหนือปริญญา (non-degree program)',
        options: [
          {title: 'ไม่เกิน 3,000 บาท'},
          {title: '3,001-5,000 บาท'},
          {title: '5,001-7,000 บาท'},
          {title: 'มากกว่า 7,000 บาท'},
        ],
      },
    ],
  },
  [SECTION_GENZ_LIFESTYLE_IN_PRESENT_PART_1]: {
    id: 3,
    title: 'สภาพปัจจุบันของคนในยุค Gen Z',
    questions: [
      {
        no: 1,
        label: 'ด้านเป้าหมายในชีวิต/อนาคต',
        showForGroups: ['A'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title:
          'วุฒิการศึกษาอย่างน้อยระดับปริญญาตรีคือเป้าหมายด้านการเรียนในอนาคตของท่าน',
        description: 'โปรดเลือกระดับความคิดเห็นของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 2,
        label: 'ด้านเป้าหมายในชีวิต/อนาคต',
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title:
          'การสำเร็จการศึกษาจากสถาบันที่มีชื่อเสียงทำให้ท่านเกิดการได้เปรียบในการได้งานที่มีรายได้สูง',
        description: 'โปรดเลือกระดับความคิดเห็นของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 3,
        label: 'ด้านเป้าหมายในชีวิต/อนาคต',
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title:
          'การเรียนเพื่อการพัฒนาทักษะ soft skills หรือทักษะที่เป็นประโยชน์ต่อการทำงานและการใช้ชีวิตสังคม เช่น ทักษะการคิดสังเคราะห์ (Critical thinking) ทักษะการทำงานเป็นทีม (teamwork) มีความจำเป็น',
        description: 'โปรดเลือกระดับความคิดเห็นของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 4,
        label: 'ด้านเป้าหมายในชีวิต/อนาคต',
        showForGroups: ['A', 'B'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title: 'การได้รับวุฒิปริญญาตรีจะทำให้ท่านมีโอกาสได้งานที่มั่นคง',
        description: 'โปรดเลือกระดับความคิดเห็นของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 5,
        label: 'ด้านเป้าหมายในชีวิต/อนาคต',
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title:
          'การสำเร็จการศึกษาจากมหาวิทยาลัยที่มีชื่อเสียงทำให้ท่านมีความก้าวหน้าของอาชีพ',
        description: 'โปรดเลือกระดับความคิดเห็นของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 6,
        label: 'ด้านเป้าหมายในชีวิต/อนาคต',
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title:
          'การเรียนในมหาวิทยาลัยเป็นการสร้างเครือข่ายความสัมพันธ์ (connection) ที่มีผลต่ออาชีพของท่านในอนาคต',
        description: 'โปรดเลือกระดับความคิดเห็นของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 7,
        label: 'ด้านเป้าหมายในชีวิต/อนาคต',
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title:
          'การประกอบอาชีพอิสระ การเป็นผู้ประกอบการ หรือเจ้านายตัวเองดีกว่าการทำงานเป็นองค์กรภาครัฐหรือเอกชน',
        description: 'โปรดเลือกระดับความคิดเห็นของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 8,
        label: 'แรงสนับสนุนจากตนเอง',
        showForGroups: ['A'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title:
          'ท่านมีจุดมุ่งหมายของการเรียนรู้คือพัฒนาตนเองเพื่อเข้าสู่การเรียนระดับมหาวิทยาลัย',
        description: 'โปรดเลือกระดับความคิดเห็นของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 9,
        label: 'แรงสนับสนุนจากตนเอง',
        showForGroups: ['B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title: 'ท่านสามารถกำหนดทิศทางการพัฒนาตนเองได้ ',
        description: 'โปรดเลือกระดับความคิดเห็นของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 10,
        label: 'แรงสนับสนุนจากตนเอง',
        showForGroups: ['B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title:
          'ท่านมีจุดมุ่งหมายของการเรียนคือการปรับและเพิ่มพูนทักษะ (Reskill/Upskill) ในการประกอบอาชีพ',
        description: 'โปรดเลือกระดับความคิดเห็นของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 11,
        label: 'แรงสนับสนุนจากตนเอง',
        showForGroups: ['B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title:
          'ท่านมีจุดมุ่งหมายของการเรียนเพื่อพัฒนาตนเอง สร้างโอกาส และทางเลือกในการประกอบอาชีพที่สอง หรืออาชีพเสริม',
        description: 'โปรดเลือกระดับความคิดเห็นของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 12,
        label: 'แรงสนับสนุนจากตนเอง',
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title:
          'ท่านมีจุดมุ่งหมายของการเรียนเพื่อพัฒนาทักษะ Soft skill หรือทักษะที่เป็นประโยชน์ต่อการทำงานและการใช้ชีวิตสังคม',
        description: 'โปรดเลือกระดับความคิดเห็นของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 13,
        label: 'แรงสนับสนุนจากตนเอง',
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title:
          'ท่านมีจุดมุ่งหมายของการเรียนเพื่อตอบสนองความหลงใหลในการเรียนรู้ (passion)',
        description: 'โปรดเลือกระดับความคิดเห็นของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 14,
        label: 'แรงสนับสนุนจากตนเอง',
        showForGroups: ['A'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title:
          'ท่านมีจุดมุ่งหมายของการเรียนในมหาวิทยาลัยเป็นความภาคภูมิใจในชื่อเสียงและเกียรติยศแก่ตนเอง',
        description: 'โปรดเลือกระดับความคิดเห็นของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 15,
        label: 'แรงสนับสนุนด้านสังคม',
        showForGroups: ['A'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title: 'ครอบครัวสนับสนุนท่านในการเข้าศึกษาต่อในระดับมหาวิทยาลัย',
        description: 'โปรดเลือกระดับความคิดเห็นของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 16,
        label: 'แรงสนับสนุนด้านสังคม',
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title: 'ครอบครัวเปิดโอกาสให้ท่านทำในสิ่งที่ท่านสนใจอย่างเต็มที่',
        description: 'โปรดเลือกระดับความคิดเห็นของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 17,
        label: 'แรงสนับสนุนด้านสังคม',
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title:
          'สิ่งที่ท่านต้องการเรียนรู้ มักเกี่ยวข้องกับธุรกิจหรืออาชีพของครอบครัว',
        description: 'โปรดเลือกระดับความคิดเห็นของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 18,
        label: 'แรงสนับสนุนด้านสังคม',
        showForGroups: ['A'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title: 'การเรียนมหาวิทยาลัยมีส่วนทำให้ท่านได้รับการยอมรับจากสังคม',
        description: 'โปรดเลือกระดับความคิดเห็นของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 19,
        label: 'แรงสนับสนุนด้านสังคม',
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title:
          'ท่านสนใจเรียนรู้สิ่งใหม่/ทักษะใหม่ ตามเทคโนโลยีและสังคมที่เปลี่ยนแปลงไป',
        description: 'โปรดเลือกระดับความคิดเห็นของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 20,
        label: 'แรงสนับสนุนด้านสังคม',
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title:
          'ท่านสนใจเรียนรู้สิ่งใหม่/ทักษะใหม่ เมื่อมีบุคคลใกล้ชิดเข้ารับการเรียนรู้ด้วย',
        description: 'โปรดเลือกระดับความคิดเห็นของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
    ],
  },
  [SECTION_GENZ_LIFESTYLE_IN_PRESENT_PART_2]: {
    id: 4,
    title: 'สภาพปัจจุบันของคนในยุค Gen Z',
    questions: [
      {
        no: 1,
        showForGroups: ['A'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title: 'อยากเรียนวิชาที่สนใจแต่ไม่มีให้เรียน',
        description: 'โปรดเลือกระดับความคิดเห็นของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 2,
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title: 'ระยะเวลาเรียนในระดับอุดมศึกษานานเกินไป',
        description: 'โปรดเลือกระดับความคิดเห็นของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 3,
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title:
          'วิธีการสอนและการจัดการเรียนรู้ไม่น่าสนใจ/รูปแบบการเรียนการสอนไม่น่าสนใจ ไม่หลากหลาย',
        description: 'โปรดเลือกระดับความคิดเห็นของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 4,
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title: 'ค่าใช้จ่ายในการเรียนหรือค่าธรรมเนียมการศึกษาสูง',
        description: 'โปรดเลือกระดับความคิดเห็นของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 5,
        label: 'ด้านเป้าหมายในชีวิต/อนาคต',
        showForGroups: ['A', 'B'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title: 'ไม่มีผู้ให้คำแนะนำในการเรียน/ขาดความรู้เกี่ยวกับหลักสูตร',
        description: 'โปรดเลือกระดับความคิดเห็นของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 6,
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title: 'เข้าถึง/ค้นหาข้อมูลหลักสูตร/การอบรมได้ยาก',
        description: 'โปรดเลือกระดับความคิดเห็นของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 7,
        showForGroups: ['A', 'B'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title: 'ระบบการรับสมัคร/คัดเลือกที่ยุ่งยาก',
        description: 'โปรดเลือกระดับความคิดเห็นของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
    ],
  },
  [SECTION_GENZ_LIFE_EXPECTANCY_PART_1]: {
    id: 5,
    title: 'ข้อมูลการตัดสินใจและความต้องการของคนในยุค Gen Z',
    questions: [
      {
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_PRIORITIZATION,
        title: 'โปรดเรียงลำดับความสำคัญต่อการตัดสินใจในการเรียนรู้ของท่าน',
        description:
          'โดยเรียงหมายเลข 1-10 หน้าข้อความที่มีความสำคัญมากที่สุดไปยังข้อความที่มีความสำคัญน้อยที่สุด (โดย 1 = มีความสำคัญมากที่สุด 10 = มีความสำคัญน้อยที่สุด)',
        options: [
          {title: 'ความหลากหลายของหลักสูตร'},
          {title: 'ความทันสมัยของหลักสูตร'},
          {title: 'อาจารย์ผู้เชี่ยวชาญหรือวิทยากรที่มีชื่อเสียง'},
          {title: 'ชื่อเสียงและความน่าเชื่อถือของมหาวิทยาลัย'},
          {title: 'ความสะดวกในการเดินทาง/สภาพแวดล้อมของสถานที่เรียน'},
          {title: 'ระบบที่สะดวกและง่ายในการสมัคร/ลงทะเบียน'},
          {title: 'ค่าใช้จ่ายในการเรียน/ค่าธรรมเนียมการศึกษา'},
          {title: 'ความคิดเห็นจากผู้ที่เรียน/เคยเรียนในหลักสูตร '},
          {title: 'ระยะเวลาในการเรียน/แผนการเรียนตลอดหลักสูตร'},
          {title: 'การเข้าถึงข้อมูลหลักสูตร/การอบรม'},
        ],
      },
    ],
  },
  [SECTION_GENZ_LIFE_EXPECTANCY_PART_2]: {
    id: 6,
    title: 'ข้อมูลการตัดสินใจและความต้องการของคนในยุค Gen Z',
    questions: [
      {
        no: 1,
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title:
          'มหาวิทยาลัยมีหลักสูตรที่รองรับการพัฒนาทักษะเฉพาะด้าน (specialized course)',
        description: 'โปรดเลือกระดับความต้องการเรียนรู้ในมหาวิทยาลัยของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 2,
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title:
          'มหาวิทยาลัยมีหลักสูตรที่รองรับการพัฒนาทักษะรอบด้าน (generalized course)',
        description: 'โปรดเลือกระดับความต้องการเรียนรู้ในมหาวิทยาลัยของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 3,
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title:
          'มหาวิทยาลัยมีหลักสูตรที่รองรับการออกแบบหลักสูตรโดยผู้เรียน (customized course)',
        description: 'โปรดเลือกระดับความต้องการเรียนรู้ในมหาวิทยาลัยของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 4,
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title:
          'ระบบการรับสมัคร/คัดเลือกที่ยุ่งยาก4.	มหาวิทยาลัยมีหลักสูตรที่ให้ความยืดหยุ่นด้านเวลาที่ใช้ในการศึกษา เช่น หลักสูตรปริญญาที่ไม่กำหนดระยะเวลาในการศึกษา',
        description: 'โปรดเลือกระดับความต้องการเรียนรู้ในมหาวิทยาลัยของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 5,
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title:
          'มหาวิทยาลัยมีหลักสูตรที่เน้นการพัฒนาทักษะความรู้ที่ไม่มุ่งหวังปริญญา (non-degree)',
        description: 'โปรดเลือกระดับความต้องการเรียนรู้ในมหาวิทยาลัยของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 6,
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title:
          'มหาวิทยาลัยมีหลักสูตรหรือกิจกรรมที่ส่งเสริมทักษะใหม่เพื่อรองรับการเปลี่ยนแปลง',
        description: 'โปรดเลือกระดับความต้องการเรียนรู้ในมหาวิทยาลัยของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 7,
        showForGroups: ['A'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title: 'มหาวิทยาลัยมีหลักสูตรหรือกิจกรรมการปูพื้นฐานในระดับมหาวิทยาลัย',
        description: 'โปรดเลือกระดับความต้องการเรียนรู้ในมหาวิทยาลัยของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 8,
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title: 'มหาวิทยาลัยมีหลักสูตรเน้นการลงมือปฏิบัติจริง',
        description: 'โปรดเลือกระดับความต้องการเรียนรู้ในมหาวิทยาลัยของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 9,
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title:
          'มหาวิทยาลัยมีหลักสูตรที่ส่งเสริมทักษะด้านการพัฒนานวัตกรรมเพื่อเป็นผู้ประกอบการ',
        description: 'โปรดเลือกระดับความต้องการเรียนรู้ในมหาวิทยาลัยของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 10,
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title:
          'มหาวิทยาลัยมีการจัดการเรียนการสอนโดยใช้เทคโนโลยีที่ผู้เรียนสามารถติดตามย้อนหลังได้',
        description: 'โปรดเลือกระดับความต้องการเรียนรู้ในมหาวิทยาลัยของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 11,
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title:
          'มหาวิทยาลัยให้การสนับสนุนด้านเทคโนโลยีสารสนเทศ เช่น อินเตอร์เน็ต โปรแกรมคอมพิวเตอร์ ห้องปฏิบัติการคอมพิวเตอร์',
        description: 'โปรดเลือกระดับความต้องการเรียนรู้ในมหาวิทยาลัยของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 12,
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title:
          'มหาวิทยาลัยมีอาจารย์ผู้สอนที่มีวิธีการสอนที่ดีและปรับเปลี่ยนตามบริบทที่เปลี่ยนไป',
        description: 'โปรดเลือกระดับความต้องการเรียนรู้ในมหาวิทยาลัยของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
      {
        no: 13,
        showForGroups: ['A', 'B', 'C', 'D'],
        type: RESPONSE_TYPE_MULTI_CHOICE,
        title:
          'มหาวิทยาลัยมีการส่งเสริมกิจกรรมเพื่อให้เกิดการพัฒนาทักษะในศตวรรษที่ 21 เช่น ทักษะการสื่อสาร การทำงานร่วมกับผู้อื่น การคิดวิเคราะห์ และความคิดสร้างสรรค์',
        description: 'โปรดเลือกระดับความต้องการเรียนรู้ในมหาวิทยาลัยของท่าน',
        options: [
          {title: 'มากที่สุด', weight: 5},
          {title: 'มาก', weight: 4},
          {title: 'ปานกลาง', weight: 3},
          {title: 'น้อย', weight: 2},
          {title: 'น้อยที่สุด', weight: 1},
        ],
      },
    ],
  },
  [SECTION_FEEDBACK]: {
    id: 7,
    title: 'ข้อเสนอแนะ',
    questions: [
      {
        type: RESPONSE_TYPE_LONG_ANSWER,
        title: 'ข้อเสนอแนะ',
        placeholder: 'เพิ่มข้อเสนอแนะ',
        isRequired: false,
      },
    ],
  },
}
