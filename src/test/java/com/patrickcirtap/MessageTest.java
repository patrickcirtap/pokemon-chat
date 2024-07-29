package com.patrickcirtap;

import org.junit.Assert;
import org.junit.Test;

public class MessageTest {
    private final MessageType testMessageType = MessageType.NEW_USER_JOIN;
    private final String testSender = "TestSender";
    private final String testContent = "Test content";

    @Test
    public void testGetMessageType() {
        final Message testMessage = new Message(testMessageType, testSender, testContent);

        Assert.assertEquals(testMessage.getType(), testMessageType);
    }

    @Test
    public void testGetMessageSender() {
        final Message testMessage = new Message(testMessageType, testSender, testContent);

        Assert.assertEquals(testMessage.getSender(), testSender);
    }

    @Test
    public void testGetMessageContent() {
        final Message testMessage = new Message(testMessageType, testSender, testContent);

        Assert.assertEquals(testMessage.getContent(), testContent);
    }
}
