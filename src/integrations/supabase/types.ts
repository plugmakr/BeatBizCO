export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      beat_licenses: {
        Row: {
          beat_id: string
          created_at: string | null
          template_id: string
        }
        Insert: {
          beat_id: string
          created_at?: string | null
          template_id: string
        }
        Update: {
          beat_id?: string
          created_at?: string | null
          template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "beat_licenses_beat_id_fkey"
            columns: ["beat_id"]
            isOneToOne: false
            referencedRelation: "beats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "beat_licenses_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "license_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      beats: {
        Row: {
          artwork_url: string | null
          audio_url: string | null
          bpm: number | null
          created_at: string | null
          description: string | null
          genre: string | null
          id: string
          price: number | null
          producer_id: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          artwork_url?: string | null
          audio_url?: string | null
          bpm?: number | null
          created_at?: string | null
          description?: string | null
          genre?: string | null
          id?: string
          price?: number | null
          producer_id?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          artwork_url?: string | null
          audio_url?: string | null
          bpm?: number | null
          created_at?: string | null
          description?: string | null
          genre?: string | null
          id?: string
          price?: number | null
          producer_id?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "beats_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      client_files: {
        Row: {
          client_id: string
          created_at: string | null
          display_name: string | null
          file_path: string
          file_type: string
          filename: string
          id: string
          parent_id: string | null
          size: number
          type: Database["public"]["Enums"]["client_item_type"]
          updated_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          display_name?: string | null
          file_path: string
          file_type: string
          filename: string
          id?: string
          parent_id?: string | null
          size: number
          type?: Database["public"]["Enums"]["client_item_type"]
          updated_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          display_name?: string | null
          file_path?: string
          file_type?: string
          filename?: string
          id?: string
          parent_id?: string | null
          size?: number
          type?: Database["public"]["Enums"]["client_item_type"]
          updated_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_files_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_files_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "client_files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_files_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          budget_range: string | null
          created_at: string | null
          email: string | null
          genre_focus: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          producer_id: string | null
          project_type: string | null
          social_media: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          budget_range?: string | null
          created_at?: string | null
          email?: string | null
          genre_focus?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          producer_id?: string | null
          project_type?: string | null
          social_media?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          budget_range?: string | null
          created_at?: string | null
          email?: string | null
          genre_focus?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          producer_id?: string | null
          project_type?: string | null
          social_media?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      collaboration_projects: {
        Row: {
          client_id: string | null
          created_at: string | null
          created_by: string | null
          deadline: string | null
          description: string | null
          id: string
          name: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          created_by?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          name: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          created_by?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          name?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "collaboration_projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collaboration_projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      funnel_automations: {
        Row: {
          action_type: string
          config: Json | null
          created_at: string | null
          funnel_id: string | null
          id: string
          is_active: boolean | null
          name: string
          trigger_type: string
          updated_at: string | null
        }
        Insert: {
          action_type: string
          config?: Json | null
          created_at?: string | null
          funnel_id?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          trigger_type: string
          updated_at?: string | null
        }
        Update: {
          action_type?: string
          config?: Json | null
          created_at?: string | null
          funnel_id?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          trigger_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "funnel_automations_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "funnels"
            referencedColumns: ["id"]
          },
        ]
      }
      funnel_steps: {
        Row: {
          config: Json | null
          created_at: string | null
          funnel_id: string | null
          id: string
          name: string
          order_index: number
          type: string
          updated_at: string | null
          website_blocks: Json | null
        }
        Insert: {
          config?: Json | null
          created_at?: string | null
          funnel_id?: string | null
          id?: string
          name: string
          order_index: number
          type: string
          updated_at?: string | null
          website_blocks?: Json | null
        }
        Update: {
          config?: Json | null
          created_at?: string | null
          funnel_id?: string | null
          id?: string
          name?: string
          order_index?: number
          type?: string
          updated_at?: string | null
          website_blocks?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "funnel_steps_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "funnels"
            referencedColumns: ["id"]
          },
        ]
      }
      funnels: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          producer_id: string | null
          status: Database["public"]["Enums"]["funnel_status"] | null
          template_id: string | null
          updated_at: string | null
          website_template_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          producer_id?: string | null
          status?: Database["public"]["Enums"]["funnel_status"] | null
          template_id?: string | null
          updated_at?: string | null
          website_template_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          producer_id?: string | null
          status?: Database["public"]["Enums"]["funnel_status"] | null
          template_id?: string | null
          updated_at?: string | null
          website_template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "funnels_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      license_templates: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          price: number | null
          producer_id: string | null
          terms: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          price?: number | null
          producer_id?: string | null
          terms?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          price?: number | null
          producer_id?: string | null
          terms?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "license_templates_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_analytics: {
        Row: {
          created_at: string | null
          event_type: string
          id: string
          item_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: string
          item_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: string
          item_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_analytics_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "marketplace_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketplace_analytics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_categories: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          item_count: number | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          item_count?: number | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          item_count?: number | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      marketplace_items: {
        Row: {
          bpm: number | null
          category: string | null
          created_at: string | null
          description: string | null
          download_url: string | null
          genre: string | null
          id: string
          key: string | null
          preview_url: string | null
          price: number
          producer_id: string | null
          status: string | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          total_downloads: number | null
          total_plays: number | null
          total_sales: number | null
          type: string
          updated_at: string | null
        }
        Insert: {
          bpm?: number | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          download_url?: string | null
          genre?: string | null
          id?: string
          key?: string | null
          preview_url?: string | null
          price: number
          producer_id?: string | null
          status?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          total_downloads?: number | null
          total_plays?: number | null
          total_sales?: number | null
          type: string
          updated_at?: string | null
        }
        Update: {
          bpm?: number | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          download_url?: string | null
          genre?: string | null
          id?: string
          key?: string | null
          preview_url?: string | null
          price?: number
          producer_id?: string | null
          status?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          total_downloads?: number | null
          total_plays?: number | null
          total_sales?: number | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_items_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_sales: {
        Row: {
          amount: number
          buyer_id: string | null
          created_at: string | null
          id: string
          item_id: string | null
          status: string | null
        }
        Insert: {
          amount: number
          buyer_id?: string | null
          created_at?: string | null
          id?: string
          item_id?: string | null
          status?: string | null
        }
        Update: {
          amount?: number
          buyer_id?: string | null
          created_at?: string | null
          id?: string
          item_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_sales_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketplace_sales_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "marketplace_items"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          read: boolean | null
          receiver_id: string | null
          sender_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          receiver_id?: string | null
          sender_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          receiver_id?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          content: string
          created_at: string | null
          id: string
          read: boolean | null
          type: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          type: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"] | null
          subscription_plan: string | null
          updated_at: string
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"] | null
          subscription_plan?: string | null
          updated_at?: string
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          subscription_plan?: string | null
          updated_at?: string
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      project_collaborators: {
        Row: {
          created_at: string | null
          project_id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          project_id: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          project_id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_collaborators_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "collaboration_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_collaborators_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      project_files: {
        Row: {
          created_at: string | null
          file_path: string
          file_type: string
          filename: string
          id: string
          project_id: string
          size: number
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string | null
          file_path: string
          file_type: string
          filename: string
          id?: string
          project_id: string
          size: number
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string | null
          file_path?: string
          file_type?: string
          filename?: string
          id?: string
          project_id?: string
          size?: number
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_files_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "collaboration_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_files_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      project_notes: {
        Row: {
          content: string
          created_at: string | null
          created_by: string | null
          id: string
          project_id: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          project_id: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          project_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_notes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_notes_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "collaboration_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          beat_id: string | null
          comment: string | null
          created_at: string | null
          id: string
          rating: number | null
          reviewer_id: string | null
          updated_at: string | null
          visibility: string | null
        }
        Insert: {
          beat_id?: string | null
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          reviewer_id?: string | null
          updated_at?: string | null
          visibility?: string | null
        }
        Update: {
          beat_id?: string | null
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          reviewer_id?: string | null
          updated_at?: string | null
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_beat_id_fkey"
            columns: ["beat_id"]
            isOneToOne: false
            referencedRelation: "beats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      role_assignments: {
        Row: {
          assigned_at: string
          assigned_by: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          assigned_at?: string
          assigned_by?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          assigned_at?: string
          assigned_by?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          created_at: string
          id: string
          permission: string
        }
        Insert: {
          created_at?: string
          id?: string
          permission: string
        }
        Update: {
          created_at?: string
          id?: string
          permission?: string
        }
        Relationships: []
      }
      sound_library: {
        Row: {
          bpm: number | null
          created_at: string | null
          description: string | null
          duration: number | null
          file_path: string
          folder_path: string | null
          genre: string | null
          id: string
          is_favorite: boolean | null
          key: string | null
          metadata: Json | null
          original_filename: string | null
          producer_id: string | null
          size: number | null
          status: string | null
          tags: string[] | null
          title: string
          type: Database["public"]["Enums"]["sound_type"]
          updated_at: string | null
          waveform_path: string | null
        }
        Insert: {
          bpm?: number | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          file_path: string
          folder_path?: string | null
          genre?: string | null
          id?: string
          is_favorite?: boolean | null
          key?: string | null
          metadata?: Json | null
          original_filename?: string | null
          producer_id?: string | null
          size?: number | null
          status?: string | null
          tags?: string[] | null
          title: string
          type: Database["public"]["Enums"]["sound_type"]
          updated_at?: string | null
          waveform_path?: string | null
        }
        Update: {
          bpm?: number | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          file_path?: string
          folder_path?: string | null
          genre?: string | null
          id?: string
          is_favorite?: boolean | null
          key?: string | null
          metadata?: Json | null
          original_filename?: string | null
          producer_id?: string | null
          size?: number | null
          status?: string | null
          tags?: string[] | null
          title?: string
          type?: Database["public"]["Enums"]["sound_type"]
          updated_at?: string | null
          waveform_path?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sound_library_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sound_library_folders: {
        Row: {
          created_at: string | null
          id: string
          name: string
          parent_id: string | null
          producer_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          parent_id?: string | null
          producer_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          producer_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sound_library_folders_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "sound_library_folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sound_library_folders_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sound_library_project_files: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          project_id: string
          sound_id: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          project_id: string
          sound_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          project_id?: string
          sound_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sound_library_project_files_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sound_library_project_files_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "collaboration_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sound_library_project_files_sound_id_fkey"
            columns: ["sound_id"]
            isOneToOne: false
            referencedRelation: "sound_library"
            referencedColumns: ["id"]
          },
        ]
      }
      sound_library_tags: {
        Row: {
          color: string | null
          created_at: string | null
          id: string
          name: string
          producer_id: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          id?: string
          name: string
          producer_id?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          id?: string
          name?: string
          producer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sound_library_tags_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          category: string | null
          created_at: string | null
          date: string | null
          description: string | null
          id: string
          producer_id: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          category?: string | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          producer_id?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          category?: string | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          producer_id?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_producer_id_fkey"
            columns: ["producer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_management: {
        Row: {
          created_at: string
          id: string
          last_login: string | null
          login_count: number | null
          notes: string | null
          status: Database["public"]["Enums"]["user_status"] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          last_login?: string | null
          login_count?: number | null
          notes?: string | null
          status?: Database["public"]["Enums"]["user_status"] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          last_login?: string | null
          login_count?: number | null
          notes?: string | null
          status?: Database["public"]["Enums"]["user_status"] | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      client_item_type: "folder" | "file"
      funnel_status: "draft" | "active" | "archived"
      sound_type:
        | "beat"
        | "sound_kit"
        | "midi_kit"
        | "loop_kit"
        | "drum_kit"
        | "one_shot"
        | "sample"
      user_role: "producer" | "artist" | "buyer"
      user_status: "active" | "inactive" | "suspended" | "pending"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
