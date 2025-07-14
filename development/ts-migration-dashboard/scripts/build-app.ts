import path from 'path';
import fs from 'fs-extra';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import chokidar from 'chokidar';
import browserify from 'browserify';
import pify from 'pify';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment 타입 에러를 방지하기 위한 주석. types/readable-stream.d.ts이 ts-node에 적용되지 않음. (현재 context에서는 이것은 ignore된다)  // @ts-expect-error types/readable_stream.d.ts가 tsNode에 적용되지 않는다는 type error를 suppress한다.(해당 context에서 이것은 ignore된다)  // #!@#!@#$%^&*()1234567890QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890!@#$%^&*()_+=[]{}|;:,./<>?~ ```
