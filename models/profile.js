const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "patients"
    },
    handle: {
      type: String,
      required: true,
      unique:true,
      max: 40
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
    alerts: [
      {
        reason: {
          type: String
        },
        isChecked: {
          type: Boolean,
          default: false
        },
        isCalcelled: {
          type: Boolean,
          default: false
        },
        description: {
          type: String
        },
        comment: {
          type: String
        },
        time: {
          type: Date,
          default: Date.now
        }
      },
      {
        timestamps: true
      }
    ],
    vitals: [
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
        description: {
          type: String
        },
        comment: {
          type: String
        },
        time: {
          type: Date,
          default: Date.now
        }
      }
    ],
    symptoms: [
      {
        fever: {
          type: Boolean,
          default: false,
          required: true
        },
        cough: {
          type: Boolean,
          default: false,
          required: true
        },
        fatigue: {
          type: Boolean,
          default: false,
          required: true
        },
        age: {
          type: Number,
          required: true
        },
        description: {
          type: String
        },
        comment: {
          type: String
        },
        time: {
          type: Date,
          default: Date.now
        }
      },
      {
        timestamps: true
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = Profile = mongoose.model("Profile", ProfileSchema);
