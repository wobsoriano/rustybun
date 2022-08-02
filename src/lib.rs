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

#[no_mangle]
/// # Safety
/// Internal function
pub unsafe extern "C" fn load_history(editor: *const Mutex<Editor<()>>, path: *mut i8) -> *mut i8 {
    let editor = ManuallyDrop::new(Arc::from_raw(editor));

    let cstr = ManuallyDrop::new(CString::from_raw(path));
    let path = cstr.to_str().unwrap();
    let history = editor.lock().unwrap().load_history(&*path);

    if history.is_err() {
        return CString::new("No previous history.").unwrap().into_raw();
    }

    return CString::new("").unwrap().into_raw();
}

#[no_mangle]
/// # Safety
/// Internal function
pub unsafe extern "C" fn save_history(editor: *const Mutex<Editor<()>>, path: *mut i8) -> *mut i8 {
    let editor = ManuallyDrop::new(Arc::from_raw(editor));

    let cstr = ManuallyDrop::new(CString::from_raw(path));
    let path = cstr.to_str().unwrap();
    let history = editor.lock().unwrap().save_history(&*path);

    if history.is_err() {
        return CString::new("Unable to save.").unwrap().into_raw();
    }

    return CString::new("").unwrap().into_raw();
}
