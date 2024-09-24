import React, { useEffect, useState } from "react";
import { Box, Text, VStack, Heading } from "@chakra-ui/react";

const LogViewer = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Open a connection to the log stream
    const eventSource = new EventSource("/log-stream"); // Make sure the backend and frontend are on the same domain or handle CORS

    // On receiving a new log line
    eventSource.onmessage = (event) => {
      setLogs((prevLogs) => [...prevLogs, event.data]);
    };

    // Handle errors
    eventSource.onerror = (event) => {
      console.error("Error receiving log stream:", event);
      eventSource.close();
    };

    // Cleanup the connection on component unmount
    return () => {
      eventSource.close();
    };
  }, []);

  return <Box>{logs}</Box>;
};

export default LogViewer;
