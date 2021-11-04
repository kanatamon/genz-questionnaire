import * as React from 'react'

import {useStyletron} from 'baseui'
import {H1, Paragraph1, Paragraph2} from 'baseui/typography'
import {Block} from 'baseui/block'

import Image from 'next/image'
import Link from 'next/link'

import Graphic from '../../public/undraw_time_management_re_tk5w.svg'
import Logo from '../../public/Chiang_Mai_University.svg'

import {Button} from '../components/Button'
import * as QuestionnairesUtils from '../questionnaires-utils'

export default function LandingPage() {
  const [css] = useStyletron()

  const sharedOrderedListClassName = css({
    listStyle: 'revert',
    marginLeft: '16px',
  })

  const sharedContentContainerClassName = css({
    flex: '1 1 400px',
    paddingTop: '64px',
    paddingBottom: '64px',
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

        <header className={sharedContentContainerClassName}>
          <H1 style={{fontSize: '1.4rem'}}>ขณะนี้หมดเวลาสำหรับส่งคำตอบแล้ว</H1>
          <Block height={'16px'} />
          <Paragraph1>
            ทีมผู้วิจัยขอขอบคุณที่ท่านให้ความสนใจเข้าร่วมตอบแบบสอบถาม
            &quot;โครงการศึกษาคุณลักษณะของ Gen Z มหาวิทยาลัยเชียงใหม่&quot;
          </Paragraph1>
          <Block height={'64px'} />
          <Link href="/">
            <a style={{display: 'block', textAlign: 'left'}}>
              <Button
                style={{
                  maxWidth: '300px',
                  // ฺฺISSUE(can't use variant's props): This is hot-fixing by
                  // directly inject desired css variables and need to be fix
                  //
                  // EXPECT: using variant's props reach to desired design
                  '--text-color': '#000000',
                  '--front-background-image': `linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)`,
                }}
              >
                อ่านรายละเอียดโครงการวิจัย
              </Button>
            </a>
          </Link>
        </header>
        <div className={sharedContentContainerClassName}>
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
