const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "patient"
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  history: {
    type: [String]
  },
  birthday: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  blood: {
    type: String,
    required: true
  },
  visits: [
    {
      date: {
        type: Date
      }
    }
  ],
  alert: [
    {
      reason: {
        type: String
      },
      sent: {
        type: Date,
        required: true,
        default: Date.now
      },
      isChecked: {
        type: Boolean,
        default:false
      },
      isCalcelled: {
        type: Boolean,
        default:false
      },
      memo: {
        type: String
      }
    }
  ],
  vital: [
    {
      temperature: {
        type: Number,
        required: true
      },
      heartRate: {
        type: Number,
        required: true
      },
      bloodPressure: {
        type: Number,
        required: true
      },
      respiratoryRate: {
        type: Number,
        required: true
      },
      date: {
        type: Date,
        required: true,
        default: Date.now
      },
      description: {
        type: String
      },
      memo: {
        type: String
      }
    }
  ],
  symptom: [
    {
      fever: {
        type: Boolean,
        default:false,
        required: true
      },
      cough: {
        type: Boolean,
        default:false,
        required: true
      },
      fatigue: {
        type: Boolean,
        default:false,
        required: true
      },
      date: {
        type: Date,
        required: true,
        default: Date.now
      },
      memo: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("Profile", ProfileSchema);
