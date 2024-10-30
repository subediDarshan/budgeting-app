import React from 'react'
import { Form, NavLink } from 'react-router-dom'
import logomark from "../assets/logomark.svg"
import { TrashIcon } from '@heroicons/react/24/solid'

function Navbar({userName}) {
  return (
    <>
        <nav>
            <NavLink to={"/"} aria-label='go to home'>
                <img src={logomark} />
                <span>HomeBudget</span>
            </NavLink>

            {
                userName && (
                    <Form 
                        method='post'
                        action='logout' 
                        onSubmit={(e) => {
                            if(!confirm("Delete user and all data?")) {
                                e.preventDefault()
                            }
                        }}
                    >
                        <button type='submit' className="btn btn--warning">
                            Delete User
                            <TrashIcon width={20} />
                        </button>
                    </Form>

                )

            }



        </nav>
    
    </>
  )
}

export default Navbar