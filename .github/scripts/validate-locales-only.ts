const { readChangedAndNewFilesWithStatus, getChangedAndNewFiles } = require('../../test/e2e/changedFilesUtil.js');

function validateLocalesOnlyChangedFiles() {
  const files = getChangedAndNewFiles(readChangedAndNewFilesWithStatus());
  if (!files || files.length === 0) {
    console.error('Failure: No changed files detected.');
    process.exit(1);
  }

  const invalid = files.filter(file => !file.startsWith('app/_locales/'));
  
  if (invalid.length > 0) {
    console.error(`Failure: Changed files must be in the /_locales/ directory.\n Changed Files: ${files}\n Invalid Files: ${invalid}`);
    process.exit(1);
  }

  console.log('Passed validation');
}

validateLocalesOnlyChangedFiles();
