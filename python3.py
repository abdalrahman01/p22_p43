import bpy

def create_red_ball():
    # Create a red ball
    bpy.ops.mesh.primitive_uv_sphere_add(radius=1, location=(0, 0, 0))
    bpy.ops.transform.translate(value=(0, 0, 1))  # Move the ball slightly above the origin

    # Create a red material
    red_material = bpy.data.materials.new(name="RedMaterial")
    red_material.diffuse_color = (1, 0, 0, 1)  # Set the diffuse color to red

    # Assign the red material to the ball
    bpy.context.object.data.materials.append(red_material)

def perform_operations():
    # Clear existing mesh objects
    bpy.ops.object.select_all(action='DESELECT')
    bpy.ops.object.select_by_type(type='MESH')
    bpy.ops.object.delete()

    # Create the red ball
    create_red_ball()

    # Export the red ball to GLTF format
    export_path = "/home/alosh/projects/exam/red_ball.gltf"
    bpy.ops.export_scene.gltf(filepath=export_path, export_format='GLTF_SEPARATE')

if __name__ == "__main__":
    perform_operations()
