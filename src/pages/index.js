import * as React from 'react'
import {Card, StyledBody, StyledAction} from 'baseui/card'
import {Button} from 'baseui/button'
import Link from 'next/link'

import * as QuestionnairesUtils from '../questionnaires-utils'

export default function LandingPage() {
  const getStartedQuestionLink =
    QuestionnairesUtils.generateGetStartedQuestionLink()

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeContent: 'center',
      }}
    >
      <Card
        title="กิจกรรมโครงการวิจัย มหาวิทยาลัยเชียงใหม่"
        overrides={{Root: {style: {width: '328px'}}}}
      >
        <StyledBody>
          ขอเชิญชวนผู้ร่วมกิจกรรมตอบแบบสอบถาม ปัญหา (Pain Point) และความต้องการ
          (Gain Point) ของ Gen Z ในด้านรูปแบบการจัดการเรียนรู้และหลักสูตร
          ทั้งนี้ผู้ร่วมตอบแบบสอบถามในกิจกรรมมีสิทธิ์ได้ลุ้นรับของรางวัลจากทางโครงการด้วย
        </StyledBody>
        <StyledAction>
          <Link href={getStartedQuestionLink} passHref>
            <Button
              overrides={{
                BaseButton: {style: {width: '100%'}},
              }}
            >
              เริ่มทำแบบสอบถาม
            </Button>
          </Link>
        </StyledAction>
      </Card>
    </div>
  )
}
