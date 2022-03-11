import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Text,
  Box,
} from "@chakra-ui/react"
import { useRef } from "react"
import { useRsi } from "../../hooks/useRsi"

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  fields: string[]
}

export const UnmatchedFieldsAlert = ({ isOpen, onClose, onConfirm, fields }: Props) => {
  const { allowInvalidSubmit, translations } = useRsi()
  const cancelRef = useRef<HTMLButtonElement | null>(null)

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef} isCentered id="rsi">
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {translations.matchColumnsStep.unmatchedFieldsWarningTitle}
          </AlertDialogHeader>
          <AlertDialogBody>
            {translations.matchColumnsStep.unmatchedFieldsWarningDescription}
            <Box pt={3}>
              <Text display="inline">{translations.matchColumnsStep.unmatchedFieldsWarningList}</Text>
              <Text display="inline" fontWeight="bold">
                {" "}
                {fields.join(", ")}
              </Text>
            </Box>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} variant="secondary">
              {translations.matchColumnsStep.cancelButtonTitle}
            </Button>
            {allowInvalidSubmit && (
              <Button onClick={onConfirm} ml={3}>
                {translations.matchColumnsStep.continueButtonTitle}
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
