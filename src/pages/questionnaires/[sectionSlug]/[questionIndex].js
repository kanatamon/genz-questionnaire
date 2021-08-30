import * as React from 'react'

import {styled, useStyletron} from 'styletron-react'
import {
  Display4,
  Caption1,
  Paragraph1,
  Paragraph3,
  H1,
  H2,
  H3,
} from 'baseui/typography'
import {Input, SIZE} from 'baseui/input'
import {Button, KIND as ButtonKind} from 'baseui/button'
import {RadioGroup, Radio, ALIGN} from 'baseui/radio'
import {Checkbox, LABEL_PLACEMENT} from 'baseui/checkbox'
import {List, arrayMove, arrayRemove} from 'baseui/dnd-list'
import {Textarea} from 'baseui/textarea'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  ROLE,
} from 'baseui/modal'
import {StatefulPopover} from 'baseui/popover'
import {colors} from 'baseui/tokens'
import {Block} from 'baseui/block'
import {Drawer} from 'baseui/drawer'
import {Card, StyledBody} from 'baseui/card'
import {Avatar} from 'baseui/avatar'

import ArrowRight from 'baseui/icon/arrow-right'
import ArrowLeft from 'baseui/icon/arrow-left'

import {AppNavBar, setItemActive} from 'baseui/app-nav-bar'
import {
  ChevronDown,
  ChevronRight,
  Delete,
  Overflow,
  Upload,
  Plus,
} from 'baseui/icon'

import Link from 'next/link'
import {useRouter} from 'next/router'

import * as QuestionnairesUtils from '../../../questionnaires-utils'
import * as ClientMemory from '../../../client-memory'

const RespondingRootWrapper = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const RespondingInteractionWrapper = styled('div', {
  maxWidth: '500px',
  width: '100%',
})

class ModalStateContainer extends React.Component {
  state = {
    isConfirmationOpen: false,
  }
  toggleConfirm = (open = !this.state.isConfirmationOpen, cb = () => {}) => {
    this.setState({isConfirmationOpen: open}, cb)
  }
  render() {
    return this.props.children({
      isConfirmationOpen: this.state.isConfirmationOpen,
      toggleConfirm: this.toggleConfirm,
    })
  }
}

const ActivityRegisterModal = ({
  isOpen,
  onClose = () => {},
  onEmailSubmit = () => {},
}) => {
  const [email, setEmail] = React.useState('')

  return (
    <ModalStateContainer>
      {({isConfirmationOpen, toggleConfirm}) => (
        <>
          <Modal
            onClose={onClose}
            isOpen={isOpen}
            unstable_ModalBackdropScroll={true}
          >
            <ModalHeader>
              ท่านสนใจเข้าร่วมกิจกรรมลุ้นรับ iPad หรือไม่?
            </ModalHeader>
            <ModalBody>
              Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla
              ornare faucibus ex, non facilisis nisl. Maecenas aliquet mauris ut
              tempus.
            </ModalBody>
            <ModalFooter>
              <ModalButton kind="tertiary" onClick={onClose}>
                ยกเลิก
              </ModalButton>
              <ModalButton onClick={() => toggleConfirm(true)} autoFocus>
                ตกลง
              </ModalButton>
            </ModalFooter>
          </Modal>
          <Modal
            unstable_ModalBackdropScroll={true}
            onClose={() => toggleConfirm(false)}
            isOpen={isConfirmationOpen}
          >
            <ModalHeader>โปรดระบุอีเมลของท่าน</ModalHeader>
            <ModalBody>
              <span>
                Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla
                ornare faucibus ex, non facilisis nisl. Maecenas aliquet mauris
                ut tempus.
              </span>
              <Block height={'12px'} />
              <Input
                value={email}
                onChange={({target}) => setEmail(target.value)}
                placeholder="your_name@email.com"
                clearOnEscape
                clearable
                type="email"
              />
            </ModalBody>
            <ModalFooter>
              <ModalButton
                kind="tertiary"
                onClick={() => toggleConfirm(false, () => onClose())}
              >
                ยกเลิก
              </ModalButton>
              <ModalButton
                onClick={() => {
                  toggleConfirm(false, () => {
                    onClose()
                    onEmailSubmit(email)
                  })
                }}
              >
                บันทึก
              </ModalButton>
            </ModalFooter>
          </Modal>
        </>
      )}
    </ModalStateContainer>
  )
}

const RegisterEditorModal = ({initialEmail, isOpen, onClose, onSubmit}) => {
  const [email, setEmail] = React.useState('')

  React.useEffect(() => {
    setEmail(initialEmail)
  }, [initialEmail])

  return (
    <Modal
      unstable_ModalBackdropScroll={true}
      onClose={onClose}
      isOpen={isOpen}
    >
      <ModalHeader>โปรดระบุอีเมลของท่าน</ModalHeader>
      <ModalBody>
        <span>
          Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare
          faucibus ex, non facilisis nisl. Maecenas aliquet mauris ut tempus.
        </span>
        <Block height={'12px'} />
        <Input
          value={email}
          onChange={({target}) => setEmail(target.value)}
          placeholder="your_name@email.com"
          clearOnEscape
          clearable
          type="email"
        />
      </ModalBody>
      <ModalFooter>
        <ModalButton kind="tertiary" onClick={onClose}>
          ยกเลิก
        </ModalButton>
        <ModalButton
          onClick={() => {
            onClose()
            onSubmit(email)
          }}
        >
          บันทึก
        </ModalButton>
      </ModalFooter>
    </Modal>
  )
}

const MainNavigation = ({title}) => {
  const router = useRouter()
  const [isOpenActivityModal, setIsOpenActivityModal] = React.useState(false)
  const [isOpenRegisterEditorModal, setIsOpenRegisterEditorModal] =
    React.useState(false)
  const [email, setEmail] = React.useState('')

  React.useEffect(function initSettingToWhateverInMemory() {
    const memoryAttendeeEmail = ClientMemory.getAttendeeEmail()

    if (!memoryAttendeeEmail) {
      setIsOpenActivityModal(true)
    }
  }, [])

  const handleOnEmailSubmit = newEmail => {
    setEmail(newEmail)
    ClientMemory.saveAttendeeEmail(newEmail)
  }

  const handleOnItemSelect = ({command}) => {
    switch (command) {
      case 'register': {
        setIsOpenActivityModal(true)
        return
      }

      case 'edit': {
        setIsOpenRegisterEditorModal(true)
        return
      }

      case 'reset_questionnaire': {
        const getStartedQuestionLink =
          QuestionnairesUtils.generateGetStartedQuestionLink()
        router.push(getStartedQuestionLink)
        setIsOpenActivityModal(true)
        return
      }
    }
  }

  let userItems = [
    {icon: ChevronRight, label: 'ลงทะเบียน', command: 'register'},
    {
      icon: ChevronRight,
      label: 'เริ่มทำแบบสอบถามใหม่',
      command: 'reset_questionnaire',
    },
  ]

  if (email) {
    userItems = [
      {icon: ChevronRight, label: 'แก้ไขอีเมล', command: 'edit'},
      {
        icon: ChevronRight,
        label: 'เริ่มทำแบบสอบถามใหม่',
        command: 'reset_questionnaire',
      },
    ]
  }

  return (
    <>
      <AppNavBar
        title={title}
        username={email}
        usernameSubtitle={email ? '' : 'ยังไม่ได้ลงทะเบียน'}
        userItems={userItems}
        onUserItemSelect={handleOnItemSelect}
      />
      <ActivityRegisterModal
        isOpen={isOpenActivityModal}
        onClose={() => setIsOpenActivityModal(false)}
        onEmailSubmit={handleOnEmailSubmit}
      />
      <RegisterEditorModal
        initialEmail={email}
        isOpen={isOpenRegisterEditorModal}
        onClose={() => setIsOpenRegisterEditorModal(false)}
        onSubmit={handleOnEmailSubmit}
      />
    </>
  )
}

const QuestionHeader = ({title, description}) => {
  return (
    <>
      <Card
        overrides={{
          Root: {
            style: {
              width: '100%',
              textAlign: 'center',
            },
          },
        }}
      >
        <StyledBody>
          <Paragraph1>{title}</Paragraph1>
          {description ? (
            <Caption1 $style={{marginTop: '0px', marginBottom: '0px'}}>
              {description}
            </Caption1>
          ) : null}
        </StyledBody>
      </Card>
    </>
  )
}

const RespondingCommon = ({question, children}) => {
  return (
    <RespondingRootWrapper>
      <QuestionHeader {...question} />
      <Block height={'32px'} />
      <RespondingInteractionWrapper>{children}</RespondingInteractionWrapper>
    </RespondingRootWrapper>
  )
}

const ShortAnswerResponding = ({question, onValidate = () => {}}) => {
  const [value, setValue] = React.useState('')
  const onValidateRef = React.useRef(onValidate)

  React.useEffect(function asyncOnValidateCallback() {
    onValidateRef.current = onValidate
  })

  React.useEffect(
    function initValueToWhateverInMemoryWhenQuestionChanged() {
      const memoryResponding = ClientMemory.getRespondingByQuestionId(
        question.id,
      )
      const memoryValue = memoryResponding?.respondingText
      if (!!memoryValue) {
        setValue(memoryValue)
        onValidateRef.current(true)
      } else {
        setValue('')
        onValidateRef.current(false)
      }
    },
    [question.id],
  )

  React.useEffect(
    function validateValueWhenChanged() {
      const isOk = value !== ''
      onValidateRef.current(isOk)
    },
    [value],
  )

  const handleOnChange = ({target}) => {
    const {value: currentValue} = target
    setValue(currentValue)

    ClientMemory.patchRespondingByQuestionId(question.id, {
      respondingText: currentValue,
    })
  }

  return (
    <RespondingCommon question={question}>
      <Input
        value={value}
        onChange={handleOnChange}
        size={SIZE.large}
        placeholder={question.placeholder}
        type={question.inputTypeForDOM ?? 'text'}
        clearable
        clearOnEscape
      />
    </RespondingCommon>
  )
}

const LongAnswerResponding = ({question, onValidate = () => {}}) => {
  const [value, setValue] = React.useState('')
  const onValidateRef = React.useRef(onValidate)

  React.useEffect(function asyncOnValidateCallback() {
    onValidateRef.current = onValidate
  })

  React.useEffect(
    function initValueToWhateverSavedInMemoryWhenQuestionChanged() {
      const memoryResponding = ClientMemory.getRespondingByQuestionId(
        question.id,
      )
      const memoryValue = memoryResponding?.respondingText
      if (!!memoryValue) {
        setValue(memoryValue)
        onValidateRef.current(true)
      } else {
        setValue('')
        onValidateRef.current(false)
      }
    },
    [question.id],
  )

  React.useEffect(
    function validateValueWhenChanged() {
      const isOk = value !== ''
      onValidateRef.current(isOk)
    },
    [value],
  )

  const handleOnValueChange = ({currentTarget}) => {
    const {value: currentValue} = currentTarget
    setValue(currentValue)

    ClientMemory.patchRespondingByQuestionId(question.id, {
      respondingText: currentValue,
    })
  }

  return (
    <RespondingCommon question={question}>
      <Textarea
        size={SIZE.large}
        value={value}
        placeholder={question.placeholder}
        onChange={handleOnValueChange}
      />
    </RespondingCommon>
  )
}

const MultiChoiceResponding = ({
  question,
  onValidate = () => {},
  onRegisteringGroups = () => {},
}) => {
  const [value, setValue] = React.useState('')
  const onValidateRef = React.useRef(onValidate)

  React.useEffect(function asyncOnValidateCallback() {
    onValidateRef.current = onValidate
  })

  React.useEffect(
    function initValueToWhateverSavedInMemoryWhenQuestionChanged() {
      console.log(question)

      const memoryResponding = ClientMemory.getRespondingByQuestionId(
        question.id,
      )
      const memoryValue =
        memoryResponding?.respondingOptions?.[0]?.respondingText

      if (memoryValue) {
        setValue(memoryValue)
        onValidateRef.current(true)
      } else {
        setValue('')
        onValidateRef.current(false)
      }
    },
    [question],
  )

  React.useEffect(
    function validateValueWhenChanged() {
      const isOk = value !== ''
      onValidateRef.current(isOk)
    },
    [value],
  )

  const handleOnValueChange = ({currentTarget}) => {
    const {value: currentValue} = currentTarget

    setValue(currentValue)

    const optionOfCurrentValue = question.options.find(
      option => option.title === currentValue,
    )

    if (!optionOfCurrentValue) {
      throw new Error(`Oop! there is no option for '${currentValue}'`)
    }

    const {registeringGroups, title, weight = null} = optionOfCurrentValue

    ClientMemory.patchRespondingByQuestionId(question.id, {
      respondingOptions: [
        {
          respondingText: title,
          weight,
          isOther: false,
          respondingOtherText: null,
        },
      ],
    })

    if (registeringGroups) {
      ClientMemory.saveAsRegisteredGroups(registeringGroups)
      onRegisteringGroups(registeringGroups)
    }
  }

  return (
    <RespondingCommon question={question}>
      <RadioGroup
        value={value}
        onChange={handleOnValueChange}
        align={ALIGN.vertical}
        overrides={{
          RadioGroupRoot: {
            style: {
              gap: '12px',
            },
          },
        }}
      >
        {question.options.map(option => (
          <Radio
            key={option.title}
            value={option.title}
            description={option.description}
            overrides={{
              Root: {
                style: {
                  backgroundColor: colors.gray50,
                  padding: '10px 14px',
                  marginTop: '0px',
                  marginBottom: '0px',
                  width: '100%',
                },
              },
            }}
          >
            {option.title}
          </Radio>
        ))}
      </RadioGroup>
    </RespondingCommon>
  )
}

function generateInitialCheckboxesValues(question) {
  const displayAsCheckboxOptions = question.options.filter(
    option => option.type === undefined,
  )
  const initialCheckboxes = displayAsCheckboxOptions.map(() => false)

  return {
    displayAsCheckboxOptions,
    initialCheckboxes,
  }
}

const CheckboxesResponding = ({question, onValidate = () => {}}) => {
  const [checkboxes, setCheckboxes] = React.useState([])
  const [otherText, setOtherText] = React.useState('')
  const onValidateRef = React.useRef(onValidate)

  React.useEffect(function asyncOnValidateCallback() {
    onValidateRef.current = onValidate
  })

  React.useEffect(
    function initValuesToWhateverSavedInMemoryWhenQuestionChanged() {
      const memoryResponding = ClientMemory.getRespondingByQuestionId(
        question.id,
      )
      const memoryValues = memoryResponding?.respondingOptions ?? []

      const checkboxRespondings = memoryValues.filter(
        memoryValue => !!memoryValue.respondingText,
      )

      const {displayAsCheckboxOptions, initialCheckboxes} =
        generateInitialCheckboxesValues(question)

      if (checkboxRespondings.length > 0) {
        const respondingTexts = checkboxRespondings.map(
          responding => responding.respondingText,
        )

        const memoryCheckboxes = displayAsCheckboxOptions.map(option =>
          respondingTexts.includes(option.title),
        )

        setCheckboxes(memoryCheckboxes)
      } else {
        setCheckboxes(initialCheckboxes)
      }

      const otherTextResponding = memoryValues.find(
        memoryValue => !!memoryValue.respondingOtherText,
      )

      if (otherTextResponding) {
        setOtherText(otherTextResponding.respondingOtherText)
      } else {
        setOtherText('')
      }
    },
    [question],
  )

  React.useEffect(
    function validateValuesWhenChanged() {
      const isCheckboxesOk = checkboxes.some(checked => !!checked)
      const isOtherAnswerOk = otherText !== ''
      const isAllOk = isCheckboxesOk || isOtherAnswerOk

      onValidateRef.current(isAllOk)
    },
    [checkboxes, otherText],
  )

  React.useEffect(
    function saveValuesToMemoryWhenChanged() {
      const {displayAsCheckboxOptions} =
        generateInitialCheckboxesValues(question)

      const checkedRespondingOptions = checkboxes
        .map((checked, checkboxIndex) => {
          if (checked) {
            return {
              respondingText: displayAsCheckboxOptions[checkboxIndex].title,
              weight: null,
              isOther: false,
              respondingOtherText: null,
            }
          }

          return null
        })
        .filter(respondingOption => !!respondingOption)

      let patchedRespondingOptions = [...checkedRespondingOptions]

      if (otherText) {
        patchedRespondingOptions = [
          ...patchedRespondingOptions,
          {
            respondingText: null,
            weight: null,
            isOther: true,
            respondingOtherText: otherText,
          },
        ]
      }

      ClientMemory.patchRespondingByQuestionId(question.id, {
        respondingOptions: patchedRespondingOptions,
      })
    },
    [checkboxes, otherText, question],
  )

  const isAbleAnswerOther = question.options.some(
    option => option.type === 'SHORT_ANSWER',
  )

  const handleOnCheckboxesChange = (isChecked, optionIndex) => {
    checkboxes[optionIndex] = isChecked
    setCheckboxes([...checkboxes])
  }

  const handleOnOtherTextChange = ({target}) => {
    const currentOtherAnswer = target.value
    setOtherText(currentOtherAnswer)
  }

  const {displayAsCheckboxOptions} = generateInitialCheckboxesValues(question)

  return (
    <RespondingCommon question={question}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {displayAsCheckboxOptions.map((option, optionIndex) => (
          <Checkbox
            key={option.title}
            checked={checkboxes[optionIndex]}
            onChange={({target}) =>
              handleOnCheckboxesChange(target.checked, optionIndex)
            }
            overrides={{
              Root: {
                style: {
                  backgroundColor: colors.gray50,
                  padding: '10px 14px',
                },
              },
            }}
          >
            {option.title}
          </Checkbox>
        ))}
        {isAbleAnswerOther ? (
          <Input
            value={otherText}
            onChange={handleOnOtherTextChange}
            placeholder="อื่นๆ โปรดระบุ"
            clearOnEscape
            clearable
          />
        ) : null}
      </div>
    </RespondingCommon>
  )
}

const PrioritizationResponding = ({question, onValidate = () => {}}) => {
  const [items, setItems] = React.useState([])
  const onValidateRef = React.useRef(onValidate)

  React.useEffect(function asyncOnValidateCallback() {
    onValidateRef.current = onValidate
  })

  React.useEffect(function alwaysValidateItems() {
    onValidateRef.current(true)
  }, [])

  React.useEffect(
    function setItemsToWhateverSavedInMemoryWhenQuestionChanged() {
      const memoryResponding = ClientMemory.getRespondingByQuestionId(
        question.id,
      )
      const memoryItems = memoryResponding?.respondingOptions ?? []

      const isSavedInMemory = memoryItems.length > 0

      let initialItems = null

      if (isSavedInMemory) {
        initialItems = memoryItems
          .sort(function lessToMost(a, b) {
            return a.weight - b.weight
          })
          .map(option => option.respondingText)
      } else {
        initialItems = question.options.map(option => option.title)
      }

      setItems(initialItems)
    },
    [question],
  )

  React.useEffect(
    function saveValuesToMemoryWhenChanged() {
      const patchedRespondingOptions = items.map((item, itemIndex) => ({
        respondingText: item,
        weight: itemIndex + 1,
        isOther: true,
        respondingOtherText: null,
      }))

      ClientMemory.patchRespondingByQuestionId(question.id, {
        respondingOptions: patchedRespondingOptions,
      })
    },
    [question, items],
  )

  return (
    <RespondingCommon question={question}>
      <List
        items={items}
        overrides={{
          DragHandle: WeightDragHandle,
        }}
        onChange={({oldIndex, newIndex}) =>
          setItems(
            newIndex === -1
              ? arrayRemove(items, oldIndex)
              : arrayMove(items, oldIndex, newIndex),
          )
        }
      />
    </RespondingCommon>
  )
}

const WeightDragHandle = ({$index}) => {
  const [css] = useStyletron()
  return (
    <div
      className={css({
        marginRight: '1em',
        display: 'flex',
        alignItems: 'center',
      })}
    >
      <Avatar name={`${$index + 1}`} />
    </div>
  )
}

const OverviewDrawer = () => {
  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false)

  return (
    <Drawer
      isOpen={isOpenDrawer}
      autoFocus
      onClose={() => setIsOpenDrawer(false)}
    >
      <div>drawer content</div>
    </Drawer>
  )
}

const RESPONDING_COMPONENTS = {
  SHORT_ANSWER: ShortAnswerResponding,
  MULTI_CHOICE: MultiChoiceResponding,
  CHECKBOXES: CheckboxesResponding,
  PRIORITIZATION: PrioritizationResponding,
  LONG_ANSWER: LongAnswerResponding,
}

function findNearestQuestionLink(
  allPossibleQuestionIds,
  allQuestionsMap,
  registeredGroups,
) {
  const nextQuestionIdIndex = allPossibleQuestionIds.findIndex(questionId => {
    const {showForGroups} = allQuestionsMap[questionId]

    if (!showForGroups) {
      return true
    }

    const isNext = registeredGroups.some(registeredGroup =>
      showForGroups.includes(registeredGroup),
    )

    return isNext
  })

  let nextQuestionLink = null

  if (nextQuestionIdIndex !== -1) {
    const nextQuestionId = allPossibleQuestionIds[nextQuestionIdIndex]
    const {link} = allQuestionsMap[nextQuestionId]

    nextQuestionLink = link
  }

  return nextQuestionLink
}

const Questionnaire = ({question}) => {
  const router = useRouter()
  const [isAutoNext, setIsAutoNext] = React.useState(false)
  const [isReadyToGoNext, setIsReadyToGoNext] = React.useState(false)
  const [registeredGroups, setRegisteredGroups] = React.useState([])
  const [linkCursor, setLinkCursor] = React.useState({
    prevQuestionLink: '',
    nextQuestionLink: '',
  })

  React.useEffect(
    function updateLinkCursorWhenRegisteredGroupsChanged() {
      const allQuestionsMap = QuestionnairesUtils.generateAllQuestionsMap()
      const allQuestionsMapIds = Object.keys(allQuestionsMap)

      const thisQuestionPosition = allQuestionsMapIds.indexOf(question.id)

      const nextQuestionPosition = thisQuestionPosition + 1
      const allPossibleNextQuestionIds =
        allQuestionsMapIds.slice(nextQuestionPosition)

      const nextQuestionLink = findNearestQuestionLink(
        allPossibleNextQuestionIds,
        allQuestionsMap,
        registeredGroups,
      )

      const allPossiblePrevQuestionIds = allQuestionsMapIds
        .slice(0, thisQuestionPosition)
        .reverse()

      const prevQuestionLink = findNearestQuestionLink(
        allPossiblePrevQuestionIds,
        allQuestionsMap,
        registeredGroups,
      )

      setLinkCursor({
        nextQuestionLink,
        prevQuestionLink,
      })
    },
    [question, registeredGroups],
  )

  React.useEffect(function initRegisteredGroupsToWhateverSavedInMemory() {
    const memoryRegisteredGroups =
      typeof window !== 'undefined' ? ClientMemory.getRegisteredGroups() : []
    setRegisteredGroups(memoryRegisteredGroups)
  }, [])

  const isNewResponding = router.query.isNewResponding !== undefined

  if (isNewResponding) {
    ClientMemory.reset()

    const newRespondingsTemplate =
      QuestionnairesUtils.generateNewRespondingsTemplate()
    ClientMemory.saveAllRespondingsTemplate(newRespondingsTemplate)
  }

  const RespondingComp = RESPONDING_COMPONENTS[question.type]

  const handleOnRespondingValidate = isOk => {
    setIsReadyToGoNext(isOk)

    if (isOk && isAutoNext && question.type === 'MULTI_CHOICE') {
      router.push(linkCursor.nextQuestionLink)
    }
  }

  const handleOnRegisteringNewGroups = newRegisteringGroups => {
    setRegisteredGroups(newRegisteringGroups)
  }

  const sectionDisplayIndex =
    QuestionnairesUtils.getSectionDisplayIndexBySectionSlug(
      question.sectionSlug,
    )
  const title = `ตอนที่ ${sectionDisplayIndex}`

  return (
    <>
      <MainNavigation title={title} />
      <Block height={'48px'} />
      <div
        style={{
          maxWidth: '900px',
          margin: 'auto',
          paddingLeft: '24px',
          paddingRight: '24px',
        }}
      >
        {RespondingComp ? (
          <RespondingComp
            question={question}
            onValidate={handleOnRespondingValidate}
            onRegisteringGroups={handleOnRegisteringNewGroups}
          />
        ) : (
          question.title
        )}
      </div>
      <Block height={'64px'} />
      <div
        style={{
          maxWidth: '900px',
          margin: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'repeat(2, auto)',
          columnGap: 24,
          rowGap: 16,
        }}
      >
        {linkCursor.prevQuestionLink ? (
          <Link href={linkCursor.prevQuestionLink} passHref>
            <Button
              $as="a"
              $style={{gridColumn: 1}}
              startEnhancer={() => <ArrowLeft size={24} />}
              kind={ButtonKind.secondary}
            >
              ก่อนหน้า
            </Button>
          </Link>
        ) : null}
        {linkCursor.nextQuestionLink ? (
          <>
            {isReadyToGoNext ? (
              <Link href={linkCursor.nextQuestionLink} passHref>
                <Button
                  $as="a"
                  $style={{gridColumn: 2}}
                  endEnhancer={() => <ArrowRight size={24} />}
                >
                  ถัดไป
                </Button>
              </Link>
            ) : (
              <StatefulPopover
                content={
                  <Paragraph3 padding="scale500">
                    โปรดระบุคำตอบเพื่อไปยังคำถามถัดไป
                  </Paragraph3>
                }
                accessibilityType={'tooltip'}
              >
                <Button
                  $as="a"
                  $style={{
                    gridColumn: 2,
                    backgroundColor: colors.yellow100,
                    color: colors.gray600,
                  }}
                  endEnhancer={() => <ArrowRight size={24} />}
                  disabled
                >
                  ถัดไป
                </Button>
              </StatefulPopover>
            )}

            <span
              style={{gridColumn: '1 / -1', gridRow: 2, justifySelf: 'center'}}
            >
              <Checkbox
                checked={isAutoNext}
                onChange={e => setIsAutoNext(e.target.checked)}
                labelPlacement={LABEL_PLACEMENT.right}
              >
                เปิดโหมดเลื่อนไปคำถามถัดไปอัตโนมัติ?
              </Checkbox>
            </span>
          </>
        ) : null}
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const paths = QuestionnairesUtils.getAllQuestionsParams().map(
    questionParams => ({
      params: questionParams,
    }),
  )

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({params}) {
  const thisQuestionParams = {
    sectionSlug: params.sectionSlug,
    questionIndex: params.questionIndex,
  }

  const allQuestionsParams = QuestionnairesUtils.getAllQuestionsParams()

  const allQuestionLinks = allQuestionsParams.map(
    QuestionnairesUtils.generateQuestionLink,
  )

  const thisRouteQuestionLink =
    QuestionnairesUtils.generateQuestionLink(thisQuestionParams)

  const thisQuestionLinkIndex = allQuestionLinks.indexOf(thisRouteQuestionLink)

  const nextQuestionLink = allQuestionLinks[thisQuestionLinkIndex + 1] ?? null
  const prevQuestionLink = allQuestionLinks[thisQuestionLinkIndex - 1] ?? null

  const thisQuestion =
    QuestionnairesUtils.getQuestionByQuestionParams(thisQuestionParams)

  const questionId = QuestionnairesUtils.generateQuestionId(thisQuestionParams)

  return {
    props: {
      question: {
        id: questionId,
        ...thisQuestionParams,
        ...thisQuestion,
        prevQuestionLink,
        nextQuestionLink,
      },
    },
  }
}

export default Questionnaire
