import type { ActionFunction } from "@remix-run/node";
import qs from "qs";
import { addLeg } from "~/server/firebase.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.text();
  const {legs} = qs.parse(formData);

  console.log(legs)
    
    
    addLeg({...legs});
    return null;
  };