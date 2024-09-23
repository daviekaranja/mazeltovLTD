import logging
import sys
from logging.handlers import TimedRotatingFileHandler

# Configuration settings for the logger
LOGGING_CONFIG = {
    "log_file": "app.log",  # Log file name
    "log_level": logging.INFO,  # Log level
    "file_log_format": '{"timestamp": "%(asctime)s", "level": "%(levelname)s", "message": "%(message)s", "module": '
                       '"%(module)s", "line": "%(lineno)d"}',
    "console_log_format": "%(levelname)s:     %(message)s",  # Console log format
    "rotation": "midnight",  # Rotate logs at midnight
    "retention": 7  # Keep logs for 7 days
}


# Configure the logger
def setup_logger() -> logging.Logger:
    logger = logging.getLogger("my_logger")
    logger.setLevel(LOGGING_CONFIG["log_level"])

    # File handler with rotation
    file_handler = TimedRotatingFileHandler(
        LOGGING_CONFIG["log_file"],
        when=LOGGING_CONFIG["rotation"],
        interval=1,
        backupCount=LOGGING_CONFIG["retention"]
    )

    # Console handler
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(logging.DEBUG)

    # Formatter for file handler
    file_formatter = logging.Formatter(LOGGING_CONFIG["file_log_format"])
    file_handler.setFormatter(file_formatter)

    # Formatter for console handler
    console_formatter = logging.Formatter(LOGGING_CONFIG["console_log_format"])
    console_handler.setFormatter(console_formatter)

    # Add handlers to logger
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)

    return logger


# Create the logger instance
log = setup_logger()
