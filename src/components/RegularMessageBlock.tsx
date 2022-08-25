import React, { MutableRefObject, useRef } from "react"

//Material UI
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Avatar from "@mui/material/Avatar"

import { msgObj } from "../interface/iMessages"

interface Props {
  msgObj: msgObj
  clientId: number
}

const RegularMessageBlock: React.FC<Props> = ({ msgObj, clientId }) => {
  const cardRef: MutableRefObject<HTMLDivElement | null> = useRef(null)
  const myMessage = msgObj.cid === clientId

  const messageDate = new Date(msgObj.rxDate).toLocaleTimeString("sv-SV")

  const avatarSettings = {
    size: "2em",
    margin: "0.4em",
    fontSize: "1em",
  }

  const userColor = () => {
    const color: any = msgObj.cid

    const colorPicker: any = {
      1: "#F6A993",
      2: "#829C86",
      3: "#FBDEBB",
      4: "#D486AB",
      5: "#7554AA",
      6: "#F9CDA7",
      7: "#F6DBB2",
      8: "#EDA146",
      9: "#E8498C",
      10: "#6A518E",
    }

    console.log(color)

    return colorPicker[color > 10 ? 10 : color]
  }

  return (
    <>
      <CardHeader
        sx={{
          padding: "0",
          opacity: "0.8",
        }}
        subheaderTypographyProps={{ marginLeft: myMessage ? "" : "2.5em" }}
        subheader={
          msgObj.user + " - " + (msgObj.srvAck ? "" : "*") + messageDate
        }
      />
      {!myMessage && (
        <Avatar
          sx={{
            float: "left",
            width: avatarSettings.size,
            height: avatarSettings.size,
            marginTop: avatarSettings.margin,
            marginRight: avatarSettings.margin,

            fontSize: avatarSettings.fontSize,
            bgcolor: userColor(),
            color: "#fff",
          }}
        >
          {Array.from(msgObj.user)[0]}
          {Array.from(msgObj.user)[msgObj.user.length - 1]}
        </Avatar>
      )}
      <Card
        style={{
          width: "fit-content",
          backgroundColor: myMessage ? "rgb(212, 168, 140)" : "#E4E6EB",
          color: myMessage ? "#fff" : "#000",
          textAlign: "left",
          borderRadius: "18px",
          borderBottomLeftRadius: myMessage ? "18px" : "4px",
          borderBottomRightRadius: myMessage ? "4px" : "18px",
        }}
      >
        <CardContent
          ref={cardRef}
          style={{ width: "fit-content", padding: "10px" }}
        >
          <span>{msgObj.text}</span>
        </CardContent>
      </Card>
    </>
  )
}

export default RegularMessageBlock
