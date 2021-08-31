import * as React from 'react'

import {Button, SIZE} from 'baseui/button'
import {H1, Paragraph1} from 'baseui/typography'
import {Block} from 'baseui/block'
import ArrowRight from 'baseui/icon/arrow-right'

import Image from 'next/image'
import Link from 'next/link'

import Graphic from '../../public/undraw_mobile_testing_reah.svg'
import Logo from '../../public/Chiang_Mai_University.svg'

import * as QuestionnairesUtils from '../questionnaires-utils'

export default function LandingPage() {
  const getStartedQuestionLink =
    QuestionnairesUtils.generateGetStartedQuestionLink()

  return (
    <div
      style={{
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr min(1136px, calc(100% - 64px)) 1fr',
        gridTemplateRows: 'auto',
        columnGap: '32px',
      }}
    >
      <main
        style={{
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
        <header
          style={{maxWidth: '500px', paddingTop: '64px', paddingBottom: '64px'}}
        >
          <H1>
            กิจกรรมโครงการวิจัย
            <br />
            มหาวิทยาลัยเชียงใหม่
          </H1>
          <Block height={'48px'} />
          <Paragraph1>
            ขอเชิญชวนผู้ร่วมกิจกรรมตอบแบบสอบถาม ปัญหา (Pain Point)
            และความต้องการ (Gain Point) ของ Gen Z
            ในด้านรูปแบบการจัดการเรียนรู้และหลักสูตร
            ทั้งนี้ผู้ร่วมตอบแบบสอบถามในกิจกรรมมีสิทธิ์ได้ลุ้นรับของรางวัลจากทางโครงการด้วย
          </Paragraph1>
          <Block height={'32px'} />
          <Link href={getStartedQuestionLink} passHref>
            <Button
              $as="a"
              size={SIZE.large}
              endEnhancer={() => <ArrowRight size={24} />}
            >
              เริ่มทำแบบสอบถาม
            </Button>
          </Link>
        </header>
        <div
          style={{flex: '1 1 400px', paddingTop: '64px', paddingBottom: '64px'}}
        >
          <Image
            layout="responsive"
            src={Graphic}
            alt="Picture of the author"
          />
        </div>
      </main>
    </div>
  )
}
