const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { v4 } = require('uuid');


const noteTaker = express()