const base_user_directory = './public/users/'
const base_workshop_directory = './public/workshops/'
function extension_from_char(type) {
  if (type == '/') return ".jpg"
  if (type == 'i') return ".png"
  if (type == 'U') return ".webp"
  return null;
}

export function base64_to_image(base64Raw, username) {
  const FileSystem = require("fs");

  if (base64Raw == null) {
    return;
  }

  if (extension_from_char(base64Raw.charAt(0)) == null) {
    return;
  }

  FileSystem.writeFile(base_user_directory + username + extension_from_char(base64Raw.charAt(0)), base64Raw, 'base64', function (err) { });
}

export function main_image_to_base64(name) {
  const FileSystem = require("fs");

  var bitmap = null;

  try {
    bitmap = FileSystem.readFileSync(base_workshop_directory + name + "/1" + ".jpg");
  } catch {
    bitmap = null;
  }
  
  if (!bitmap) {
    try {
      bitmap = FileSystem.readFileSync(base_workshop_directory + name + "/1" + ".png");
    } catch {
      bitmap = null;
    }
    
    if (!bitmap) {
      try {
        bitmap = FileSystem.readFileSync(base_workshop_directory + name + "/1" + ".webp");
      } catch {
        bitmap = null;
      }
    } 
  } 

  if (!bitmap) {
    return null;
  }

  return Buffer.from(bitmap).toString('base64');
}

export function image_to_base64(username) {
  const FileSystem = require("fs");

  var bitmap = null;

  try {
    bitmap = FileSystem.readFileSync(base_user_directory + username + ".jpg");
  } catch {
    bitmap = null;
  }
  
  if (!bitmap) {
    try {
      bitmap = FileSystem.readFileSync(base_user_directory + username + ".png");
    } catch {
      bitmap = null;
    }
    
    if (!bitmap) {
      try {
        bitmap = FileSystem.readFileSync(base_user_directory + username + ".webp");
      } catch {
        bitmap = null;
      }
    } 
  } 

  if (!bitmap) {
    return null;
  }
  
  return Buffer.from(bitmap).toString('base64');
}

export function check_size(base64Raw) {
  const header = atob(base64Raw.slice(0, 50)).slice(16,24)
  const uint8 = Uint8Array.from(header, c => c.charCodeAt(0))
  const dataView = new DataView(uint8.buffer)

  const size = {
    width: dataView.getInt32(0),
    height: dataView.getInt32(4)
  }
  console.log(size);

  if (size.width > 300 || size.width < 100) {
    return false;
  }

  if (size.height > 300 || size.height < 100) {
    return false;
  }

  return true;
}