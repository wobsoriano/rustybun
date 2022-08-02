use rustyline::Editor;
use std::{
    ffi::CString,
    mem::ManuallyDrop,
    sync::{Arc, Mutex},
};
mod signal;
use signal::Signal;

#[no_mangle]
pub extern "C" fn create() -> *const Mutex<Editor<()>> {
    let rl = Editor::<()>::new().expect("Unexpected error");
    Arc::into_raw(Arc::new(Mutex::new(rl)))
}

#[no_mangle]
/// # Safety
/// Internal function
pub unsafe extern "C" fn readline(editor: *const Mutex<Editor<()>>, prompt: *mut i8) -> *mut i8 {
    let editor = ManuallyDrop::new(Arc::from_raw(editor));
    
    let cstr = ManuallyDrop::new(CString::from_raw(prompt));
    let prompt = cstr.to_str().unwrap();
    let readline = editor
        .lock()
        .unwrap()
        .readline(&*prompt);
    
    let sig: Signal = readline.into();

    CString::new(nanoserde::SerJson::serialize_json(&sig))
        .unwrap()
        .into_raw()
}


