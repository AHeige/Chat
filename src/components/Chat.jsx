import React, { useRef, useEffect, useContext, useState } from "react"

//Components
import ChatInput from "./ChatInput"
import ChatMessages from "./ChatMessages"

//Material UI
import Grid from "@mui/material/Grid"
import Drawer from "@mui/material/Drawer"

//Contexts
import { SettingsContext } from "../contexts/settingsContext"

const Chat = ({
  sendMessage,
  messages,
  isOpen,
  clientId,
  handleReaction,
  userIsWriting,
  handleIsWriting,
}) => {
  const { chatWidth } = useContext(SettingsContext)
  const [isWriting, setIsWriting] = useState(false)

  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isOpen])

  useEffect(() => {
    setIsWriting(true)
    setTimeout(() => {
      setIsWriting(false)
    }, 5000)
  }, [userIsWriting])

  return (
    <Drawer
      PaperProps={{
        sx: {
          //backgroundColor: "#000",
          right: 0,
          width: `${chatWidth}%`,
          flexDirection: "column-reverse",
        },
      }}
      variant="persistent"
      anchor="right"
      open={isOpen}
      hideBackdrop
    >
      <Grid item style={{ height: "0px" }} ref={bottomRef} />
      <Grid
        container
        direction="row"
        alignContent={"flex-end"}
        style={{
          //minHeight: "100vh",
          marginBottom: "3.5em",
          marginTop: "2.8em",
          //backgroundColor: "#000",
          flex: "auto",
        }}
      >
        <ChatMessages
          messages={messages}
          clientId={clientId}
          handleReaction={handleReaction}
          userIsWriting={userIsWriting}
          handleIsWriting={handleIsWriting}
        />
        {isWriting &&
          userIsWriting.map((value) => (
            <Grid sx={{ fontStyle: "italic" }}>
              {value.whoIsWriting} is writing a message
            </Grid>
          ))}
      </Grid>

      <ChatInput
        style={{ position: "fixed", bottom: "0" }}
        sendMessage={sendMessage}
        chatWidth={chatWidth}
        handleIsWriting={handleIsWriting}
        userIsWriting={userIsWriting}
        setIsWriting={setIsWriting}
        isWriting={isWriting}
      />
    </Drawer>
  )
}

export default Chat
