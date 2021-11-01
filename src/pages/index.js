import * as React from 'react'

import {useStyletron} from 'baseui'
import {H1, Paragraph1, Paragraph2} from 'baseui/typography'
import {Block} from 'baseui/block'
import ArrowRight from 'baseui/icon/arrow-right'
import {Accordion, Panel} from 'baseui/accordion'
import {ListItem, ListItemLabel} from 'baseui/list'

import Image from 'next/image'
import Link from 'next/link'

import Graphic from '../../public/cmu-genZ.png'
import Logo from '../../public/Chiang_Mai_University.svg'

import {Button} from '../components/Button'
import * as QuestionnairesUtils from '../questionnaires-utils'

export default function LandingPage() {
  const [css] = useStyletron()

  const sharedOrderedListClassName = css({
    listStyle: 'revert',
    marginLeft: '16px',
  })
  const questionnaireLink =
    QuestionnairesUtils.generateFurthestVisitableQuestionLink()

  return (
    <div
      style={{
        height: '100%',
        maxWidth: '1136px',
        margin: 'auto',
      }}
    >
      <main
        style={{
          padding: '0 32px',
          height: '100%',
          gridColumn: '2',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          columnGap: '64px',
          rowGap: 0,
          position: 'relative',
        }}
      >
        <nav
          style={{
            position: 'absolute',
            top: 16,
          }}
        >
          <Link href="/">
            <a>
              <Image
                width="40"
                height="40"
                src={Logo}
                alt="Picture of the author"
              />
            </a>
          </Link>
        </nav>
        <div
          style={{flex: '1 1 400px', paddingTop: '64px', paddingBottom: '64px'}}
        >
          <H1 style={{fontSize: '1.4rem', textAlign: 'center'}}>
            แบบสอบถามโครงการศึกษาคุณลักษณะของ Gen Z
          </H1>
          <Block height={'48px'} />
          <Image
            layout="responsive"
            src={Graphic}
            alt="Picture of the author"
          />
        </div>
        <header
          style={{maxWidth: '500px', paddingTop: '64px', paddingBottom: '64px'}}
        >
          <Paragraph1>
            ผู้วิจัยโครงการศึกษาคุณลักษณะของ Gen Z มหาวิทยาลัยเชียงใหม่
            ขอเชิญชวนผู้สนใจที่มีอายุ ระหว่าง 16 – 26 ปี ตอบแบบสอบถาม โดยมี
            รายละเอียดที่สำคัญดังนี้
          </Paragraph1>
          <Block height={'32px'} />
          <Accordion>
            <Panel title="รายละเอียดของแบบสอบถาม">
              <ol className={sharedOrderedListClassName}>
                <li>
                  <Paragraph2>แบบสอบถามแบ่งออกเป็น 4 ตอน ดังนี้</Paragraph2>
                  <ul>
                    <li>ตอนที่ 1 ข้อมูลทั่วไป</li>
                    <li>ตอนที่ 2 แหล่งความรู้และรูปแบบการเรียนรู้</li>
                    <li>ตอนที่ 3 สภาพปัจจุบันของคนในยุค Gen Z</li>
                    <li>
                      ตอนที่ 4 ข้อมูลการตัดสินใจและความต้องการของคนในยุค Gen Z
                    </li>
                    <li>ตอนที่ 5 ข้อเสนอแนะ</li>
                  </ul>
                </li>
                <Block height={'16px'} />
                <li>
                  <Paragraph2>
                    แบบสอบถามประกอบด้วยข้อคำถามรวมประมาณ 50 ข้อ
                    และใช้เวลาในการตอบแบบสอบถามทั้งหมดประมาณ 20 นาที
                    โดยชุดข้อคำถามจะแปรผันตามสถานะของผู้ตอบแบบสอบถาม
                  </Paragraph2>
                </li>
                <Block height={'16px'} />
                <li>
                  <Paragraph2>
                    ผู้ตอบแบบสอบถามสามารถกลับเข้ามาทำแบบสอบถามได้หลายครั้ง
                    โดยการใช้อุปกรณ์เครื่องเดิมที่ทำค้างไว้ ทั้งนี้
                    ผู้ตอบแบบสอบถามจะต้องส่ง (Submit)
                    ข้อมูลแบบสอบถามภายในวันศุกร์ที่ 10 ธันวาคม 2564 เวลา 16.00
                    น. น.
                  </Paragraph2>
                </li>
                <Block height={'16px'} />
                <li>
                  <Paragraph2>
                    ข้อมูล ชื่อ-นามสกุล และ e-mail
                    ของผู้ตอบแบบสอบถามจะถูกเก็บกรณีที่เข้าร่วมกิจกรรมลุ้นรับของรางวัล
                    และใช้ยืนยันตัวตนในกรณีที่เป็นผู้โชคดีได้รับรางวัลเท่านั้น
                    คำตอบในแบบสอบถามจะถูกเก็บเป็นข้อมูลแยกอิสระจากข้อมูล
                    ชื่อ-นามสกุล และ e-mail ของผู้ตอบแบบสอบถาม
                  </Paragraph2>
                </li>
              </ol>
            </Panel>
            <Panel title="รายละเอียดข้อกำหนดและเงื่อนไขของรางวัล">
              <Paragraph2>
                เพื่อเป็นการขอบคุณในข้อมูลที่เป็นประโยชน์และเวลาที่มีคุณค่าของผู้ตอบแบบสอบถาม
                ทีมวิจัยได้จัดกิจกรรมจับรางวัลสำหรับผู้สนใจ ในศุกร์ที่ 24
                ธันวาคม 2564 เวลา 15.00 น. โดยรางวัลประกอบด้วย
              </Paragraph2>
              <Block height={'16px'} />
              <ol className={sharedOrderedListClassName}>
                <li>
                  iPad Air รุ่น Wi-Fi 256 GB มูลค่า 24,900 บาท จำนวน 1 รางวัล
                </li>
                <li>บัตรเงินสด True Money มูลค่า 500 บาท จำนวน 5 รางวัล</li>
                <li>
                  บัตร Tesco Lotus Gift Card มูลค่า 500 บาท จำนวน 5 รางวัล
                </li>
              </ol>
              <Block height={'24px'} />
              <Paragraph2>โดยมีข้อกำหนดและเงื่อนไข ดังนี้</Paragraph2>
              <Block height={'16px'} />
              <ol className={sharedOrderedListClassName}>
                <li>
                  ผู้ตอบแบบสอบถามให้ข้อมูล e-mail
                  เพื่อใช้ในการติดต่อเมื่อได้รับรางวัล และข้อมูล ชื่อ-นามสกุล
                  ที่ถูกต้องตามบัตรประจำตัวประชาชน และต้องมีอายุระหว่าง 16-26 ปี
                  ก่อนวันที่ 24 ธันวาคม 2564 ต้องมีสัญชาติไทย
                  และอาศัยอยู่ในประเทศไทย เท่านั้น
                </li>
                <li>
                  ผู้ตอบแบบสอบถาม 1 ท่าน ตอบแบบสอบถามได้เพียง 1 ชุด เท่านั้น
                </li>
                <li>
                  ผู้ตอบแบบสอบถามที่ได้รับรางวัลจะได้รับแจ้ง e-mail
                  และต้องติดต่อรับรางวัล ภายในวันจันทร์ที่ 10 มกราคม 2565
                  ก่อนเวลา 16.00 น. พร้อมแนบหลักฐานยืนยันตัวตนตาม ชื่อ-นามสกุล
                  ที่ได้ให้ไว้ในขั้นตอนการลงทะเบียน
                  และไม่สามารถโอนสิทธิ์ให้ผุ้อื่นได้
                </li>
                <li>
                  ทีมงานจะไม่รับผิดชอบต่อความชำรุดบกพร่องเกี่ยวกับของรางวัล
                  ตลอดจนความเสียหายใดๆ ที่เกิดขึ้นกับของรางวัล
                </li>
                <li>
                  ทีมงานจะไม่รับภาระและ/หรือรับผิดชอบต่อค่าใช้จ่ายเดินทาง
                  ค่าที่พัก และ/หรือค่าใช้จ่ายอื่นๆ
                  ในการมารับของรางวัลของผู้ได้รับรางวัล ทั้งนี้
                  ผู้ได้รับรางวัลต้องเป็นผู้รับผิดชอบเองทั้งหมด
                </li>
                <li>
                  ทีมงานมีสิทธิ์เปลี่ยนแปลง ปฏิเสธ ยกเลิก
                  หรือหยุดกิจกรรมได้โดยชอบธรรม
                  และไม่จำเป็นต้องแจ้งให้ทราบล่วงหน้า ทั้งนี้ ผู้เข้าร่วมกิจกรรม
                  ไม่มีสิทธิ์ในการเรียกร้อง
                  หรือร้องขอผลจากการสูญเสียหรือความเสียหายที่เกิดขึ้นทางตรงและทางอ้อมจากทีมงาน{' '}
                </li>
                <li>
                  ผู้ที่ได้รับรางวัลยินยอมให้ทางทีมงานพิมพ์และ/หรือเผยแพร่รายชื่อ
                  และ/หรือรูปถ่ายของผู้ที่ได้รับรางวัลเพื่อการโฆษณาและประชาสัมพันธ์ในปัจจุบันและ/หรือในอนาคตตามที่เห็นสมควร
                </li>
                <li>ของรางวัลไม่สามารถแลกหรือเปลี่ยนมูลค่าเป็นเงินสดได้</li>
                <li>
                  ทีมงานขอสงวนสิทธิ์มอบรางวัลเฉพาะผู้ที่ปฏิบัติตามเงื่อนไขที่กำหนดไว้เท่านั้น
                </li>
                <li>
                  ทีมงานขอสงวนสิทธิ์ในการเปลี่ยนแปลงเงื่อนไข
                  และสิทธิประโยชน์ต่าง ๆ โดยมิต้องแจ้งให้ทราบล่วงหน้า
                </li>
                <li>การประกาศรายชื่อผู้ได้รับรางวัลถือเป็นที่สิ้นสุด</li>
              </ol>
            </Panel>
            <Panel title="รายละเอียดของโครงการวิจัย">
              <Paragraph2>วัตถุประสงค์ของการวิจัย</Paragraph2>
              <Block height={'16px'} />
              <ol className={sharedOrderedListClassName}>
                <li>
                  เพื่อสังเคราะห์คุณลักษณะ (Characteristics) ของคนในยุค Gen Z
                </li>
                <li>
                  เพื่อศึกษาปัญหา (Pain Point) ความต้องการ (Gain Point)
                  ในด้านรูปแบบการเรียนรู้ (Learning Platform)
                  และหลักสูตรที่ตอบสนองของคนในยุค Gen Z 
                </li>
              </ol>
              <Block height={'24px'} />
              <Paragraph2>
                ผลที่คาดว่าจะได้รับและประโยชน์จากการดำเนินการ
              </Paragraph2>
              <Block height={'16px'} />
              <ol className={sharedOrderedListClassName}>
                <li>
                  ได้ข้อมูลสำคัญเพื่อการนำไปวางแผนในการพัฒนาคณาจารย์มหาวิทยาลัยเพื่อรองรับคุณลักษณะและความต้องการที่สำคัญของ
                  Gen Z
                  รวมถึงการจัดเตรียมระบบและอุปกรณ์เพื่อสนับสนุนกลุ่มผู้เรียน Gen
                  Z
                </li>
                <li>
                  ได้ข้อมูลสำคัญสำหรับการออกแบบหลักสูตรทั้งในรูปแบบหลักสูตรเพื่อปริญญาหรือนอกปริญญา
                  (non-degree program) ที่ตอบสนองความต้องการของ Gen Z
                </li>
                <li>
                  ได้ข้อมูลพื้นฐานเพื่อให้มหาวิทยาลัยใช้ประโยชน์ในการวิเคราะห์เพื่อปรับการบริการรองรับฐานลูกค้ากลุ่ม
                  Gen Z
                </li>
              </ol>
              <Block height={'24px'} />
              <Paragraph2>ทีมวิจัยจากมหาวิทยาลัยเชียงใหม่</Paragraph2>
              <ul>
                {[
                  [
                    'รองศาสตราจารย์อุษณีย์ คำประกอบ',
                    'รองอธิการบดี หัวหน้าโครงการวิจัย',
                  ],
                  [
                    'ผู้ช่วยศาสตราจารย์ ดร.น้ำผึ้ง อินทะเนตร',
                    'รองคณบดีคณะศึกษาศาสตร์',
                  ],
                  [
                    'รองศาสตราจารย์ ดร.ปรารถนา ใจผ่อง',
                    'ผู้อำนวยการวิทยาลัยการศึกษาตลอดชีวิต',
                  ],
                  [
                    'รองศาสตราจารย์ ดร.อลิส ชาร์ป',
                    'รองผู้อำนวยการวิทยาลัยการศึกษาตลอดชีวิต',
                  ],
                  [
                    'อาจารย์ ดร.อานันท์ สีห์พิทักษ์เกียรติ',
                    'ผู้อำนวยศูนย์นวัตกรรมการสอนและการเรียนรู้',
                  ],
                  ['นายกีรติ ตันติคะเนดี', 'เจ้าหน้าที่ศูนย์ประสานงานวิชาการ'],
                  ['นายสราวุธ ไชยนิน', 'เจ้าหน้าที่ศูนย์ประสานงานวิชาการ'],
                  [
                    'นางสาวมาริษา เยาวภาคย์โสภณ',
                    'เจ้าหน้าที่ศูนย์ประสานงานวิชาการ',
                  ],
                ].map((row, index) => {
                  return (
                    <ListItem
                      key={row[0]}
                      overrides={{
                        Root: {
                          style: {
                            backgroundColor: 'transparent',
                          },
                        },
                        Content: {
                          style: {
                            paddingTop: '16px',
                            paddingBottom: '16px',
                          },
                        },
                      }}
                    >
                      <ListItemLabel description={row[1]}>
                        {row[0]}
                      </ListItemLabel>
                    </ListItem>
                  )
                })}
              </ul>
            </Panel>
          </Accordion>
          <Block height={'64px'} />
          <Link href={questionnaireLink}>
            <a style={{display: 'block', textAlign: 'center'}}>
              <Button
                style={{maxWidth: '300px'}}
                endEnhancer={<ArrowRight size={24} />}
              >
                เริ่มทำแบบสอบถาม
              </Button>
            </a>
          </Link>
        </header>
      </main>
    </div>
  )
}
