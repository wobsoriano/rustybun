use nanoserde::SerJson;
use rustyline::Result;
use rustyline::error::ReadlineError;

#[derive(SerJson)]
pub enum Signal {
    Success(String),
    CtrlC,
    CtrlD,
    Unknown(String)
}
impl From<Result<String>> for Signal {
    fn from(s: Result<String>) -> Self {
        match s {
            Result::Ok(line) => Self::Success(line),
            Result::Err(ReadlineError::Interrupted) => Self::CtrlC,
            Result::Err(ReadlineError::Eof) => Self::CtrlD,
            Result::Err(err) => Self::Unknown(err.to_string())
        }
    }
}
