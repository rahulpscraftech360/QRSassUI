/**
 * v0 by Vercel.
 * @see https://v0.dev/t/HXGfFOcnMHm
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
//   {
//     "email": "",
//     "phone": "",
//     "type": "route",
//     "legal_business_name": "",
//     "business_type": "",
//     "contact_name": "",
//     "profile": {
//         "category": "",
//         "subcategory": "",
//         "addresses": {
//             "registered": {
//                 "street1": "",
//                 "street2": "",
//                 "city": "",
//                 "state": "",
//                 "postal_code": "",
//                 "country": "IN"
//             }
//         }
//     },
//     "legal_info": {
//         "pan": "",
//         "gst": ""
//     }
// }
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "../utils/axiosConfig";
import { Button } from "@/components/ui/button";
export default function RazorpayConnect() {
  const [formData, setFormData] = useState({
    email: "gassura@example.com",
    phone: "9000090000",
    type: "route",

    legal_business_name: "Acme Corp",
    business_type: "partnership",
    contact_name: "Gaurav Kumar",
    profile: {
      category: "healthcare",
      subcategory: "clinic",
      addresses: {
        registered: {
          street1: "507, Koramangala 1st block",
          street2: "MG Road",
          city: "Bengaluru",
          state: "KARNATAKA",
          postal_code: "560034",
          country: "IN",
        },
      },
    },
    legal_info: {
      pan: "AAACL1234C",
      gst: "18AABCU9603R1ZM",
    },
  });

  console.log(formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/razorpay/create-account", formData);
      const resp = await response.data;
      console.log(resp);
      console.log("here");
    } catch (error) {
      console.error(error);
    }
  };

  function handleNestedChange(e, ...path) {
    const newValue = e.target.value;

    setFormData((prevFormData) => {
      // Create a function to recursively update the nested object
      const updateNestedObject = (obj, pathIndex) => {
        if (pathIndex === path.length - 1) {
          // If it's the last key, update the value
          return {
            ...obj,
            [path[pathIndex]]: newValue,
          };
        }

        // Otherwise, recurse deeper into the object
        return {
          ...obj,
          [path[pathIndex]]: updateNestedObject(
            obj[path[pathIndex]],
            pathIndex + 1
          ),
        };
      };

      return updateNestedObject(prevFormData, 0);
    });
  }

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Business Profile</CardTitle>
        <CardDescription>
          Enter your business profile information.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                value={formData.email}
                onChange={handleChange}
                id="email"
                name="email"
                placeholder="Email"
                required
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                required
                type="tel"
              />
            </div>
          </div>
          {/* <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Input id="type" placeholder="Type" required />
          </div> */}
          <hr className="border-gray-200 dark:border-gray-800" />
          <div className="space-y-2">
            <Label htmlFor="legal-business-name">Legal Business Name</Label>
            <Input
              name="legal_business_name"
              value={formData.legal_business_name}
              onChange={handleChange}
              id="legal-business-name"
              placeholder="Legal Business Name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="business-type">Business Type</Label>
            <Input
              name="business_type"
              value={formData.business_type}
              onChange={handleChange}
              id="business-type"
              placeholder="Business Type"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-name">Contact Name</Label>
            <Input
              name="contact_name"
              value={formData.contact_name}
              onChange={handleChange}
              id="contact-name"
              placeholder="Contact Name"
              required
            />
          </div>
          <hr className="border-gray-200 dark:border-gray-800" />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="profile-category">Profile Category</Label>
              <Input
                name="category"
                value={formData.profile.category}
                id="profile-category"
                placeholder="Profile Category"
                onChange={(e) => handleNestedChange(e, "profile", "category")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-subcategory">Profile Subcategory</Label>
              <input
                id="profile-subcategory"
                name="profile.subcategory"
                placeholder="Profile Subcategory"
                value={formData.profile.subcategory}
                onChange={(e) =>
                  handleNestedChange(e, "profile", "subcategory")
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <hr className="border-gray-200 dark:border-gray-800" />
          <div className="space-y-2">
            <Label className="mb-1" htmlFor="registered-street-1">
              Registered Street 1
            </Label>
            <input
              type="text"
              id="registered_street1"
              name="registered_street1"
              value={formData.profile.addresses.registered.street1}
              onChange={(e) =>
                handleNestedChange(
                  e,
                  "profile",
                  "addresses",
                  "registered",
                  "street1"
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="mb-1" htmlFor="registered-street-2">
              Registered Street 2
            </Label>

            <input
              type="text"
              id="registered_street2"
              name="registered_street2"
              value={formData.profile.addresses.registered.street2}
              onChange={(e) =>
                handleNestedChange(
                  e,
                  "profile",
                  "addresses",
                  "registered",
                  "street2"
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="City"
                required
                value={formData.profile.addresses.registered.city}
                onChange={(e) =>
                  handleNestedChange(
                    e,
                    "profile",
                    "addresses",
                    "registered",
                    "city"
                  )
                }
              />
            </div>
            <div className="space-y-2">
              {/* state: "", postal_code: "", country: "IN", */}
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                placeholder="State"
                value={formData.profile.addresses.registered.state}
                onChange={(e) =>
                  handleNestedChange(
                    e,
                    "profile",
                    "addresses",
                    "registered",
                    "state"
                  )
                }
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="postal-code">Postal Code</Label>
              <Input
                id="postal-code"
                placeholder="Postal Code"
                required
                value={formData.profile.addresses.registered.postal_code}
                onChange={(e) =>
                  handleNestedChange(
                    e,
                    "profile",
                    "addresses",
                    "registered",
                    "postal_code"
                  )
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="Country"
                required
                value={formData.profile.addresses.registered.country}
                onChange={(e) =>
                  handleNestedChange(
                    e,
                    "profile",
                    "addresses",
                    "registered",
                    "country"
                  )
                }
              />
            </div>
          </div>
          <hr className="border-gray-200 dark:border-gray-800" />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="legal-info-pan">Legal Info PAN</Label>
              <Input
                value={formData.legal_info.pan}
                onChange={(e) => handleNestedChange(e, "legal_info", "pan")}
                id="legal-info-pan"
                placeholder="Legal Info PAN"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="legal-info-gst">Legal Info GST</Label>
              <Input
                value={formData.legal_info.gst}
                onChange={(e) => handleNestedChange(e, "legal_info", "gst")}
                id="legal-info-gst"
                placeholder="Legal Info GST"
                required
              />
            </div>
          </div>
        </CardContent>

        <Button>Submit</Button>
      </form>
    </Card>
  );
}
