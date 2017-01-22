function getShortMessage(messageObject)
{   
    var allowedLength = 50;
    if(messageObject.message.length < allowedLength)
        {   
            return messageObject.message;
        }
    
}

function getString(messageObject)
{
    return messageObject.message;
}

function getShortMessages(messages)
{     
    return messages.filter(getShortMessage).map(getString);
}

module.exports = getShortMessages;