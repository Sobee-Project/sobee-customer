"use client"
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"
import React from "react"

type Props = {
  onClose: () => void
  visible: boolean
}

const DeleteAccountForm = ({ onClose, visible }: Props) => {
  const {
    isOpen,
    onOpenChange,
    onClose: _onClose
  } = useDisclosure({
    isOpen: visible,
    onClose
  })
  return (
    <Modal isOpen={isOpen} size='3xl' onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Delete account</ModalHeader>
            <ModalBody>
              <ul className='ml-4 list-item list-disc'>
                <li>
                  <p>
                    All unused Sobee Coins, Sobee Advertising account balance, Discount Codes and paid services on your
                    Sobee account will be disabled.
                  </p>
                </li>
                <li>
                  <p>
                    Clicking &quot;Continue&quot;, means - you agree that your account: DOES NOT have any transactions
                    related to purchases/sales, NO unused discount codes or unused discount codes be refunded.
                  </p>
                </li>
                <li>
                  <p>
                    After successfully deleting your account, Sobee will continue to retain transaction data for
                    financial audit purposes.
                  </p>
                </li>
                <li>
                  <p>
                    After successfully deleting your account, you will no longer be able to log in to the deleted
                    account and view previous account history. After successfully deleting your account, you will not be
                    able to access your affiliate marketing account. In addition, you will not receive outstanding
                    commissions and bonuses.
                  </p>
                </li>
                <li>
                  <p>Sobee reserves the right to refuse future account creation requests.</p>
                </li>
              </ul>
            </ModalBody>
            <ModalFooter>
              <Button color='danger' onClick={_onClose} radius='sm'>
                Yes I understand, delete my account
              </Button>
              <Button onClick={onClose} radius='sm'>
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default DeleteAccountForm
